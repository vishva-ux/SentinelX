import React from 'react';
import { LogIn, LogOut, Settings, UserCheck, ShieldAlert, Key } from 'lucide-react';

const AUDIT_LOGS = [
  { id: 'AUD-9001', timestamp: '2026-08-06T15:10:04Z', action: 'LOGIN_SUCCESS', actor: 'alex.mercer', resource: 'Web Portal', ip: '10.0.8.50', outcome: 'Success' },
  { id: 'AUD-9002', timestamp: '2026-08-06T15:08:22Z', action: 'INCIDENT_UPDATE', actor: 'alex.mercer', resource: 'INC-8891', ip: '10.0.8.50', outcome: 'Success' },
  { id: 'AUD-9003', timestamp: '2026-08-06T14:55:10Z', action: 'ROLE_ASSIGNED', actor: 'admin.system', resource: 'sarah.connor → Security Engineer', ip: '10.0.1.2', outcome: 'Success' },
  { id: 'AUD-9004', timestamp: '2026-08-06T14:50:33Z', action: 'LOGIN_FAILURE', actor: 'unknown', resource: 'VPN Gateway', ip: '45.142.214.99', outcome: 'Failed' },
  { id: 'AUD-9005', timestamp: '2026-08-06T14:40:18Z', action: 'CONFIG_CHANGE', actor: 'admin.system', resource: 'Detection Rule RULE-BRUTE-01', ip: '10.0.1.2', outcome: 'Success' },
  { id: 'AUD-9006', timestamp: '2026-08-06T14:30:00Z', action: 'LOGIN_SUCCESS', actor: 'sarah.connor', resource: 'Web Portal', ip: '10.0.9.22', outcome: 'Success' },
  { id: 'AUD-9007', timestamp: '2026-08-06T13:20:45Z', action: 'PERMISSION_CHANGE', actor: 'admin.system', resource: 'david.chen → Read Only → SOC Analyst', ip: '10.0.1.2', outcome: 'Success' },
  { id: 'AUD-9008', timestamp: '2026-08-06T13:15:10Z', action: 'LOGOUT', actor: 'david.chen', resource: 'Web Portal', ip: '10.0.7.88', outcome: 'Success' },
  { id: 'AUD-9009', timestamp: '2026-08-06T12:00:00Z', action: 'LOGIN_FAILURE', actor: 'j.doe', resource: 'API Gateway', ip: '10.0.3.15', outcome: 'Failed' },
];

const actionIcon: Record<string, React.ReactNode> = {
  LOGIN_SUCCESS: <LogIn className="w-3.5 h-3.5 text-green-600" />,
  LOGIN_FAILURE: <ShieldAlert className="w-3.5 h-3.5 text-red-600" />,
  LOGOUT: <LogOut className="w-3.5 h-3.5 text-gray-500" />,
  INCIDENT_UPDATE: <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />,
  ROLE_ASSIGNED: <UserCheck className="w-3.5 h-3.5 text-purple-600" />,
  PERMISSION_CHANGE: <Key className="w-3.5 h-3.5 text-amber-600" />,
  CONFIG_CHANGE: <Settings className="w-3.5 h-3.5 text-orange-600" />,
};

const ACTION_LABELS: Record<string, string> = {
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILURE: 'Login Failed',
  LOGOUT: 'Logout',
  INCIDENT_UPDATE: 'Incident Updated',
  ROLE_ASSIGNED: 'Role Assigned',
  PERMISSION_CHANGE: 'Permission Changed',
  CONFIG_CHANGE: 'Config Changed',
};

export const AuditLogPage: React.FC = () => {
  const filtered = AUDIT_LOGS;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Audit Log</h2>
          <p className="text-xs text-gray-400 mt-0.5">Immutable record of all authentication, authorization, and administrative actions</p>
        </div>
        <div className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-mono">
          {AUDIT_LOGS.length} events recorded today
        </div>
      </div>



      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Time', 'Action', 'Resource / Target', 'Source IP'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-400 font-mono whitespace-nowrap">{log.timestamp.slice(11, 19)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {actionIcon[log.action]}
                    <span className="font-medium text-gray-700">{ACTION_LABELS[log.action] ?? log.action}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{log.resource}</td>
                <td className="py-3 px-4 text-blue-600 font-mono">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
