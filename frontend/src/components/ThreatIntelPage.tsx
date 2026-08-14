import React from 'react';
import { Globe, Hash, Link } from 'lucide-react';

const IOCs = [
  { id: 'IOC-001', indicator: '185.220.101.5', type: 'IP' as const, threat: 'Tor Exit Node / C2 Server', confidence: 97, category: 'C2 Server', lastSeen: '3 min ago', status: 'Active' },
  { id: 'IOC-002', indicator: '45.142.214.99', type: 'IP' as const, threat: 'Brute Force Source', confidence: 92, category: 'Scanning', lastSeen: '1 hr ago', status: 'Active' },
  { id: 'IOC-003', indicator: 'e3b0c44298fc1c149afb', type: 'SHA256' as const, threat: 'Ransomware Dropper', confidence: 99, category: 'Ransomware', lastSeen: '2 hr ago', status: 'Active' },
  { id: 'IOC-004', indicator: 'malicious-update.evildomain.com', type: 'Domain' as const, threat: 'Phishing / Malware Host', confidence: 85, category: 'Phishing', lastSeen: '6 hr ago', status: 'Active' },
  { id: 'IOC-005', indicator: '198.51.100.42', type: 'IP' as const, threat: 'Credential Stuffing Bot', confidence: 78, category: 'Credential Abuse', lastSeen: '8 hr ago', status: 'Active' },
  { id: 'IOC-006', indicator: 'cobaltstrike-c2.ru', type: 'Domain' as const, threat: 'Cobalt Strike Beacon C2', confidence: 96, category: 'C2 Server', lastSeen: '12 hr ago', status: 'Active' },
  { id: 'IOC-007', indicator: '44d88612fea8a8f36de8', type: 'SHA256' as const, threat: 'Mimikatz Variant', confidence: 100, category: 'Credential Dumper', lastSeen: '1 day ago', status: 'Active' },
];

const typeIcon: Record<string, React.ReactNode> = {
  IP: <Globe className="w-3.5 h-3.5" />,
  Domain: <Link className="w-3.5 h-3.5" />,
  SHA256: <Hash className="w-3.5 h-3.5" />,
  URL: <Link className="w-3.5 h-3.5" />,
};

export const ThreatIntelPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Threat Intelligence & IOCs</h2>
          <p className="text-xs text-gray-400 mt-0.5">Indicators of Compromise, malicious IPs, domains, and file hashes from threat feeds</p>
        </div>
        <div className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
          <span className="font-bold text-red-600">{IOCs.filter(i => i.status === 'Active').length}</span> active IOCs
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Malicious IPs', count: IOCs.filter(i => i.type === 'IP').length, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Malicious Domains', count: IOCs.filter(i => i.type === 'Domain').length, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Malware Hashes', count: IOCs.filter(i => i.type === 'SHA256').length, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(card => (
          <div key={card.label} className={`${card.bg} border border-gray-200 rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${card.color}`}>{card.count}</div>
            <div className="text-xs text-gray-600 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* IOC Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Type', 'Indicator', 'Threat Actor / Category', 'Confidence', 'Last Seen', 'Status'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {IOCs.map(ioc => (
              <tr key={ioc.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    {typeIcon[ioc.type]}
                    <span className="font-mono font-medium text-gray-700">{ioc.type}</span>
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-blue-600 font-medium max-w-xs truncate">{ioc.indicator}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{ioc.threat}</div>
                  <div className="text-gray-400">{ioc.category}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                      <div className={`h-1.5 rounded-full ${ioc.confidence > 90 ? 'bg-red-500' : ioc.confidence > 75 ? 'bg-orange-500' : 'bg-amber-500'}`}
                        style={{ width: `${ioc.confidence}%` }} />
                    </div>
                    <span className="font-semibold text-gray-700">{ioc.confidence}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-400">{ioc.lastSeen}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-semibold">{ioc.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
