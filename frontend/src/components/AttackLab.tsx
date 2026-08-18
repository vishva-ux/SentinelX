import React, { useState } from 'react';
import { Play, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { ATTACK_SCENARIOS } from '../data/mockData';
import type { AttackSimulationScenario, SimulationStepLog } from '../types';
import { SeverityBadge } from './ui/SeverityBadge';

interface AttackLabProps {
  onSimulationTriggered: (scenario: AttackSimulationScenario, logs: SimulationStepLog[]) => void;
}

export const AttackLab: React.FC<AttackLabProps> = ({ onSimulationTriggered }) => {
  const [selected, setSelected] = useState<AttackSimulationScenario>(ATTACK_SCENARIOS[0]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [logs, setLogs] = useState<SimulationStepLog[]>([]);

  const intervalRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const run = () => {
    setRunning(true);
    setDone(false);
    setLogs([]);

    const generated: SimulationStepLog[] = [
      { stepIndex: 1, timestamp: new Date().toISOString(), phase: 'Reconnaissance', logLevel: 'INFO', message: `Probe initiated from ${selected.attackerIp} targeting ${selected.targetAsset}`, source: 'Network Firewall', mitreTechnique: 'T1595', details: 'TCP SYN sweep on ports 80, 443, 8080, 5432' },
      { stepIndex: 2, timestamp: new Date().toISOString(), phase: 'Initial Access', logLevel: 'WARN', message: `Malicious payload injected against ${selected.targetAsset}`, source: 'API Gateway', mitreTechnique: selected.mitreId, details: `POST matched rule ${selected.mitreId} — ${selected.name}` },
      { stepIndex: 3, timestamp: new Date().toISOString(), phase: 'Execution', logLevel: 'ERROR', message: 'Unauthorized subprocess spawned with elevated privileges', source: 'EDR Agent', mitreTechnique: 'T1059.004', details: 'bash -i spawned by service daemon' },
      { stepIndex: 4, timestamp: new Date().toISOString(), phase: 'SIEM Correlation', logLevel: 'ALERT', message: `ALERT: Correlation engine matched "${selected.name}" — Risk Score 92/100`, source: 'SentinelX Engine', mitreTechnique: selected.mitreId, details: 'Incident INC-AUTO created. Analyst assigned.' },
      { stepIndex: 5, timestamp: new Date().toISOString(), phase: 'Containment', logLevel: 'ALERT', message: 'SOAR: Host isolated. Analyst notified. Block rule pushed to firewall.', source: 'SOAR Engine', mitreTechnique: 'T1489', details: `BLOCK ${selected.attackerIp} enforced at perimeter.` },
    ];

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < generated.length) {
        const nextLog = generated[i];
        setLogs(prev => [...prev, nextLog]);
        i++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setRunning(false);
        setDone(true);
        onSimulationTriggered(selected, generated);
      }
    }, 1200);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">Attack Simulation & Training Lab</h2>
        <p className="text-xs text-gray-400 mt-0.5">Synthetic multi-stage cyber attack telemetry for analyst training and detection validation. Safe — no real attacks executed.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Scenario list */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-700">10 Attack Scenarios</h3>
          </div>
          <div className="divide-y divide-gray-100 max-h-[560px] overflow-y-auto">
            {ATTACK_SCENARIOS.map(s => (
              <button key={s.id}
                onClick={() => !running && (setSelected(s), setLogs([]), setDone(false))}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${selected.id === s.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''} ${running ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-mono">#{s.scenarioNumber}</span>
                  <SeverityBadge severity={s.severity} />
                </div>
                <div className="text-xs font-semibold text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.mitreId} · {s.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Execution pane */}
        <div className="col-span-2 space-y-4">
          {/* Scenario details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-400 mb-1">{selected.mitreId} · {selected.mitreTactic}</div>
                <h3 className="text-sm font-semibold text-gray-900">{selected.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{selected.description}</p>
              </div>
              <button onClick={run} disabled={running}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  running ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {running ? <><Cpu className="w-3.5 h-3.5 animate-spin" />Running…</> : <><Play className="w-3.5 h-3.5 fill-current" />Launch Attack</>}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
              <div><span className="text-gray-400 block">Attacker IP</span><span className="text-red-600 font-mono font-medium">{selected.attackerIp}</span></div>
              <div><span className="text-gray-400 block">Target Asset</span><span className="text-gray-700 font-medium">{selected.targetAsset}</span></div>
              <div><span className="text-gray-400 block">Category</span><span className="text-gray-700 font-medium">{selected.category}</span></div>
            </div>
          </div>

          {/* Live terminal */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800">
              <Terminal className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-gray-400 font-mono">SIEM Telemetry Stream</span>
              <span className="ml-auto text-xs text-gray-500">{logs.length} events</span>
            </div>
            <div className="p-4 h-72 overflow-y-auto space-y-2 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-600">
                  Ready — click Launch Attack to start simulation
                </div>
              ) : logs.map(log => (
                <div key={log.stepIndex} className={`flex gap-3 ${log.logLevel === 'ALERT' ? 'text-red-400' : log.logLevel === 'ERROR' ? 'text-orange-400' : log.logLevel === 'WARN' ? 'text-yellow-400' : 'text-gray-400'}`}>
                  <span className="shrink-0 text-gray-600">[{log.phase}]</span>
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
              {done && (
                <div className="flex items-center gap-2 text-green-400 pt-2 border-t border-gray-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulation complete — alert & incident generated automatically.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
