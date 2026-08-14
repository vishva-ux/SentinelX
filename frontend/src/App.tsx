import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SOCDashboard } from './components/SOCDashboard';
import { LogExplorer } from './components/LogExplorer';
import { AttackLab } from './components/AttackLab';
import { IncidentsPage } from './components/IncidentsPage';
import { MITREMatrix } from './components/MITREMatrix';
import { AssetsPage } from './components/AssetsPage';
import { ThreatIntelPage } from './components/ThreatIntelPage';
import { AuditLogPage } from './components/AuditLogPage';
import { INITIAL_ALERTS, INITIAL_INCIDENTS, INITIAL_ASSETS } from './data/mockData';
import type { SecurityAlert, SecurityIncident, AttackSimulationScenario, SimulationStepLog } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_ALERTS);
  const [incidents, setIncidents] = useState<SecurityIncident[]>(INITIAL_INCIDENTS);

  const handleSimulation = (scenario: AttackSimulationScenario, logs: SimulationStepLog[]) => {
    const newAlert: SecurityAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `[LAB] ${scenario.name} Detected`,
      severity: scenario.severity,
      timestamp: new Date().toISOString(),
      sourceIp: scenario.attackerIp,
      destinationIp: '10.0.4.12',
      mitreTechniqueId: scenario.mitreId,
      mitreTechniqueName: scenario.name,
      affectedAsset: scenario.targetAsset,
      status: 'Open',
      description: scenario.description,
      payload: logs[1]?.details,
    };
    setAlerts(prev => [newAlert, ...prev]);

    if (scenario.severity === 'Critical' || scenario.severity === 'High') {
      setIncidents(prev => [{
        id: `INC-${Date.now()}`,
        ticketNumber: `INC-${Math.floor(9000 + Math.random() * 1000)}`,
        title: `[LAB] ${scenario.name}`,
        severity: scenario.severity,
        status: 'Investigating',
        assignee: 'Alex Mercer (Lead SOC Analyst)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        affectedAssetsCount: 1,
        mitreTactics: [scenario.mitreTactic],
        description: `Synthetic attack lifecycle on ${scenario.targetAsset}.`,
        evidenceCount: logs.length,
        riskScore: scenario.severity === 'Critical' ? 95 : 82,
      }, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'dashboard' && <SOCDashboard alerts={alerts} incidents={incidents} assets={INITIAL_ASSETS} onSelectIncident={() => setActiveTab('incidents')} onNavigateToAttackLab={() => setActiveTab('attacklab')} />}
        {activeTab === 'siem' && <LogExplorer alerts={alerts} />}
        {activeTab === 'incidents' && <IncidentsPage incidents={incidents} />}
        {activeTab === 'matrix' && <MITREMatrix />}
        {activeTab === 'attacklab' && <AttackLab onSimulationTriggered={handleSimulation} />}
        {activeTab === 'assets' && <AssetsPage assets={INITIAL_ASSETS} />}
        {activeTab === 'threatintel' && <ThreatIntelPage />}
        {activeTab === 'audit' && <AuditLogPage />}
      </main>
    </div>
  );
}
