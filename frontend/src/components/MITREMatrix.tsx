import React from 'react';

const TACTICS = [
  { id: 'TA0001', name: 'Reconnaissance', color: 'bg-slate-100' },
  { id: 'TA0002', name: 'Resource Development', color: 'bg-slate-100' },
  { id: 'TA0043', name: 'Initial Access', color: 'bg-blue-50' },
  { id: 'TA0002', name: 'Execution', color: 'bg-blue-50' },
  { id: 'TA0003', name: 'Persistence', color: 'bg-indigo-50' },
  { id: 'TA0004', name: 'Privilege Escalation', color: 'bg-purple-50' },
  { id: 'TA0005', name: 'Defense Evasion', color: 'bg-purple-50' },
  { id: 'TA0006', name: 'Credential Access', color: 'bg-amber-50' },
  { id: 'TA0007', name: 'Discovery', color: 'bg-amber-50' },
  { id: 'TA0008', name: 'Lateral Movement', color: 'bg-orange-50' },
  { id: 'TA0009', name: 'Collection', color: 'bg-orange-50' },
  { id: 'TA0010', name: 'Exfiltration', color: 'bg-red-50' },
  { id: 'TA0011', name: 'Command & Control', color: 'bg-red-50' },
  { id: 'TA0040', name: 'Impact', color: 'bg-red-100' },
];

const TECHNIQUES: Record<string, { id: string; name: string; detected?: boolean }[][]> = {
  'Reconnaissance': [
    [{ id: 'T1595', name: 'Active Scanning', detected: true }],
    [{ id: 'T1592', name: 'Gather Victim Info' }],
    [{ id: 'T1589', name: 'Gather Victim Identity' }],
  ],
  'Initial Access': [
    [{ id: 'T1190', name: 'Exploit Public App', detected: true }],
    [{ id: 'T1189', name: 'Drive-by Compromise', detected: true }],
    [{ id: 'T1133', name: 'External Remote Services' }],
    [{ id: 'T1078', name: 'Valid Accounts' }],
  ],
  'Credential Access': [
    [{ id: 'T1110', name: 'Brute Force', detected: true }],
    [{ id: 'T1003', name: 'OS Credential Dumping', detected: true }],
    [{ id: 'T1555', name: 'Credentials from Stores' }],
  ],
  'Privilege Escalation': [
    [{ id: 'T1134', name: 'Access Token Manipulation', detected: true }],
    [{ id: 'T1548', name: 'Abuse Elevation Controls' }],
  ],
  'Execution': [
    [{ id: 'T1059', name: 'Command & Scripting', detected: true }],
    [{ id: 'T1059.001', name: 'PowerShell', detected: true }],
  ],
  'Lateral Movement': [
    [{ id: 'T1021', name: 'Remote Services' }],
    [{ id: 'T1534', name: 'Internal Spearphishing' }],
  ],
  'Exfiltration': [
    [{ id: 'T1048', name: 'Exfil Over Alt Protocol', detected: true }],
    [{ id: 'T1041', name: 'Exfil Over C2 Channel' }],
  ],
  'Impact': [
    [{ id: 'T1486', name: 'Data Encrypted for Impact', detected: true }],
    [{ id: 'T1498', name: 'Network DoS', detected: true }],
    [{ id: 'T1489', name: 'Service Stop' }],
  ],
};

export const MITREMatrix: React.FC = () => {
  const detectCount = Object.values(TECHNIQUES).flat(2).filter(t => t.detected).length;
  const totalCount = Object.values(TECHNIQUES).flat(2).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">MITRE ATT&CK® Matrix</h2>
          <p className="text-xs text-gray-400 mt-0.5">Enterprise threat coverage map — highlighted cells indicate detected activity in your environment</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-300 inline-block" /><span className="text-gray-600">Detected in environment</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-200 inline-block" /><span className="text-gray-600">Not detected</span></div>
          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 text-blue-700 font-semibold">{detectCount} / {totalCount} detected</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <div className="flex min-w-max">
          {TACTICS.map(tactic => (
            <div key={tactic.id + tactic.name} className="w-36 shrink-0 border-r border-gray-200 last:border-r-0">
              {/* Header */}
              <div className={`px-3 py-2.5 border-b border-gray-200 ${tactic.color}`}>
                <div className="text-xs font-bold text-gray-700 leading-tight">{tactic.name}</div>
                <div className="text-xs text-gray-400 font-mono">{tactic.id}</div>
              </div>
              {/* Techniques */}
              <div className="p-2 space-y-1">
                {(TECHNIQUES[tactic.name] || []).map((group, _ ) =>
                  group.map(tech => (
                    <div key={tech.id}
                      className={`px-2 py-1.5 rounded text-xs cursor-pointer transition-colors ${
                        tech.detected
                          ? 'bg-red-50 border border-red-200 text-red-800 hover:bg-red-100'
                          : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-gray-400">{tech.id}</div>
                      <div className="font-medium leading-tight">{tech.name}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
