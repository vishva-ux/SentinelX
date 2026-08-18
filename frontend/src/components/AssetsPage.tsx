import React, { useState } from 'react';
import { Server, Monitor, Database, Cloud, Network } from 'lucide-react';
import type { SecurityAsset } from '../types';


interface AssetsPageProps {
  assets: SecurityAsset[];
}

const typeIcon: Record<string, React.ReactNode> = {
  Server: <Server className="w-4 h-4" />,
  Endpoint: <Monitor className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
};

export const AssetsPage: React.FC<AssetsPageProps> = ({ assets }) => {
  const [selected, setSelected] = useState<SecurityAsset | null>(null);
  const [typeFilter, setTypeFilter] = useState('All');
  const types = ['All', ...Array.from(new Set(assets.map(a => a.type)))];

  const filtered = assets.filter(a => typeFilter === 'All' || a.type === typeFilter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Asset Risk Inventory</h2>
          <p className="text-xs text-gray-400 mt-0.5">Monitored assets, risk scores, and security posture</p>
        </div>
        <div className="flex gap-1">
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${typeFilter === t ? 'bg-white border border-gray-300 text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
            >{t}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-1 gap-3">
          {filtered.map(asset => (
            <div key={asset.id}
              onClick={() => setSelected(selected?.id === asset.id ? null : asset)}
              className={`bg-white border rounded-xl p-4 cursor-pointer transition-all hover:border-blue-300 ${selected?.id === asset.id ? 'border-blue-400 ring-1 ring-blue-200' : 'border-gray-200'}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600">
                  {typeIcon[asset.type] ?? <Server className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{asset.name}</span>

                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{asset.ipAddress} · {asset.os}</div>

                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${asset.riskScore > 75 ? 'text-red-600' : asset.riskScore > 50 ? 'text-orange-600' : 'text-green-600'}`}>{asset.riskScore}</div>
                  <div className="text-xs text-gray-400">Risk Score</div>
                  <div className="text-xs text-gray-400 mt-1">{asset.lastSeen}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                {asset.services.map(svc => (
                  <span key={svc} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded">{svc}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="w-72 bg-white border border-gray-200 rounded-xl p-5 space-y-4 shrink-0 self-start">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-gray-900">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-gray-400 block">Type</span><span className="text-gray-800">{selected.type}</span></div>
                <div><span className="text-gray-400 block">IP Address</span><span className="text-blue-600 font-mono">{selected.ipAddress}</span></div>
                <div><span className="text-gray-400 block">OS</span><span className="text-gray-800">{selected.os}</span></div>
                <div><span className="text-gray-400 block">Risk Score</span><span className={`font-bold text-sm ${selected.riskScore > 75 ? 'text-red-600' : 'text-orange-600'}`}>{selected.riskScore}</span></div>

              </div>
              <div>
                <span className="text-gray-400 block mb-1">Running Services</span>
                <div className="space-y-1">
                  {selected.services.map(svc => (
                    <div key={svc} className="text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{svc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
