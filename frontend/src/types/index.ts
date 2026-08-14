// SentinelX Domain Models & Types
export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type IncidentStatus = 'New' | 'Investigating' | 'In Progress' | 'Contained' | 'Resolved' | 'Closed';
export type AssetType = 'Server' | 'Endpoint' | 'Database' | 'Network' | 'Cloud' | 'Application';

export interface SecurityAlert {
  id: string;
  title: string;
  severity: SeverityLevel;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  mitreTechniqueId: string;
  mitreTechniqueName: string;
  affectedAsset: string;
  affectedUser?: string;
  status: 'Open' | 'Triaged' | 'Dismissed';
  description: string;
  payload?: string;
}

export interface SecurityIncident {
  id: string;
  ticketNumber: string;
  title: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  affectedAssetsCount: number;
  mitreTactics: string[];
  description: string;
  rootCause?: string;
  evidenceCount: number;
  riskScore: number;
}

export interface SecurityAsset {
  id: string;
  name: string;
  type: AssetType;
  ipAddress: string;
  os: string;
  owner: string;
  department: string;
  riskScore: number; // 0 - 100
  status: 'Healthy' | 'Vulnerable' | 'Compromised' | 'Offline';
  lastSeen: string;
  services: string[];
}

export interface ThreatIndicator {
  id: string;
  indicator: string; // IP, Domain, Hash
  type: 'IP' | 'Domain' | 'SHA256' | 'URL';
  threatActor: string;
  confidenceScore: number; // 0-100
  category: 'Ransomware' | 'Phishing' | 'C2 Server' | 'Malware' | 'Exfiltration';
  lastUpdated: string;
  status: 'Active' | 'Revoked';
}

export interface AttackSimulationScenario {
  id: string;
  scenarioNumber: number;
  name: string;
  category: string;
  mitreId: string;
  mitreTactic: string;
  severity: SeverityLevel;
  description: string;
  targetAsset: string;
  attackerIp: string;
  stepsCount: number;
  durationSeconds: number;
}

export interface SimulationStepLog {
  stepIndex: number;
  timestamp: string;
  phase: string;
  logLevel: 'INFO' | 'WARN' | 'ERROR' | 'ALERT';
  message: string;
  source: string;
  mitreTechnique: string;
  details: string;
}
