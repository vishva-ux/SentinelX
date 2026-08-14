import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import type { SecurityAlert } from '../types';
import { SeverityBadge } from './ui/SeverityBadge';

interface LogExplorerProps {
  alerts: SecurityAlert[];
}

export const LogExplorer: React.FC<LogExplorerProps> = ({ alerts }) => {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selected, setSelected] = useState<SecurityAlert | null>(null);

  const filtered = alerts.filter(a => {
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase())
      || a.sourceIp.includes(search) || a.mitreTechniqueId.includes(search) || a.affectedAsset.includes(search);
    const matchesSev = severityFilter === 'ALL' || a.severity === severityFilter;
    return matchesSearch && matchesSev;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">SIEM Log Explorer</h2>
          <p className="text-xs text-gray-400 mt-0.5">Real-time normalized event search with KQL filtering</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 bg-white transition-colors">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Search bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='sourceIp:192.168.1.140 OR technique:T1190'
            className="pl-9 pr-4 py-2 text-xs font-mono w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex items-center gap-1">
          {['ALL', 'Critical', 'High', 'Medium', 'Low'].map(s => (
            <button key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                severityFilter === s ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Table */}
        <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${selected ? 'flex-1' : 'w-full'}`}>
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Timestamp', 'Severity', 'Alert Title', 'Source IP', 'Asset', 'MITRE'].map(col => (
                  <th key={col} className="text-left py-3 px-4 font-semibold text-gray-500">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">No matching logs found.</td></tr>
              ) : filtered.map(alert => (
                <tr key={alert.id}
                  onClick={() => setSelected(selected?.id === alert.id ? null : alert)}
                  className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${selected?.id === alert.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
                >
                  <td className="py-2.5 px-4 text-gray-400 font-mono">{alert.timestamp.slice(0, 19).replace('T', ' ')}</td>
                  <td className="py-2.5 px-4"><SeverityBadge severity={alert.severity} /></td>
                  <td className="py-2.5 px-4 text-gray-800 font-medium max-w-xs truncate">{alert.title}</td>
                  <td className="py-2.5 px-4 text-blue-600 font-mono">{alert.sourceIp}</td>
                  <td className="py-2.5 px-4 text-gray-600">{alert.affectedAsset}</td>
                  <td className="py-2.5 px-4 text-amber-600 font-mono">{alert.mitreTechniqueId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 bg-white border border-gray-200 rounded-xl p-4 space-y-4 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-400 font-mono">{selected.id}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1 leading-snug">{selected.title}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
            </div>
            <div className="flex items-center gap-2"><SeverityBadge severity={selected.severity} /><span className="text-xs text-amber-600 font-mono">{selected.mitreTechniqueId}</span></div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Description</div>
              <p className="text-xs text-gray-700 leading-relaxed">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-gray-400 block">Source IP</span><span className="text-blue-600 font-mono">{selected.sourceIp}</span></div>
              <div><span className="text-gray-400 block">Target Asset</span><span className="text-gray-700">{selected.affectedAsset}</span></div>
              {selected.affectedUser && <div><span className="text-gray-400 block">Affected User</span><span className="text-gray-700">{selected.affectedUser}</span></div>}
              <div><span className="text-gray-400 block">Status</span><span className="text-gray-700">{selected.status}</span></div>
            </div>
            {selected.payload && (
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">Raw Payload</div>
                <pre className="text-xs bg-gray-900 text-green-400 rounded-lg p-3 overflow-x-auto font-mono leading-relaxed">{selected.payload}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
