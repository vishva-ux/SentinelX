import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { SecurityIncident } from '../types';
import { SeverityBadge } from './ui/SeverityBadge';

interface IncidentsPageProps {
  incidents: SecurityIncident[];
}



export const IncidentsPage: React.FC<IncidentsPageProps> = ({ incidents }) => {
  const [selected, setSelected] = useState<SecurityIncident | null>(null);
  const filtered = incidents;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Incident Management</h2>
          <p className="text-xs text-gray-400 mt-0.5">Active security incident tickets and analyst workbench</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Incident
        </button>
      </div>



      <div className="flex gap-4">
        {/* List */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Ticket', 'Severity', 'Title', 'Risk', 'Updated'].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(inc => (
                <tr key={inc.id}
                  onClick={() => setSelected(selected?.id === inc.id ? null : inc)}
                  className={`cursor-pointer hover:bg-blue-50/30 transition-colors ${selected?.id === inc.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-3 px-4 font-mono text-blue-600 font-semibold">{inc.ticketNumber}</td>
                  <td className="py-3 px-4"><SeverityBadge severity={inc.severity} /></td>
                  <td className="py-3 px-4 text-gray-900 font-medium max-w-xs truncate">{inc.title}</td>

                  <td className="py-3 px-4"><span className={`font-bold ${inc.riskScore > 80 ? 'text-red-600' : inc.riskScore > 50 ? 'text-orange-600' : 'text-green-600'}`}>{inc.riskScore}</span></td>
                  <td className="py-3 px-4 text-gray-400">{inc.updatedAt.slice(11, 16)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail drawer */}
        {selected && (
          <div className="w-80 bg-white border border-gray-200 rounded-xl p-5 space-y-4 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-blue-600 font-bold">{selected.ticketNumber}</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 leading-snug">{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <SeverityBadge severity={selected.severity} />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400">Description</span>
                <p className="text-gray-700 mt-1 leading-relaxed">{selected.description}</p>
              </div>
              {selected.rootCause && (
                <div>
                  <span className="text-gray-400">Root Cause</span>
                  <p className="text-gray-700 mt-1">{selected.rootCause}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div><span className="text-gray-400 block">Risk Score</span><span className={`font-bold ${selected.riskScore > 80 ? 'text-red-600' : 'text-orange-600'}`}>{selected.riskScore}/100</span></div>
                <div><span className="text-gray-400 block">Assets Affected</span><span className="text-gray-800">{selected.affectedAssetsCount}</span></div>
                <div><span className="text-gray-400 block">Evidence Items</span><span className="text-gray-800">{selected.evidenceCount}</span></div>
              </div>
              <div>
                <span className="text-gray-400">MITRE Tactics</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selected.mitreTactics.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{t}</span>
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
