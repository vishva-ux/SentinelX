import { ShieldCheck, AlertTriangle, Activity, Zap, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { SecurityAlert, SecurityIncident, SecurityAsset } from '../types';
import { SeverityBadge } from './ui/SeverityBadge';

interface DashboardProps {
  alerts: SecurityAlert[];
  incidents: SecurityIncident[];
  assets: SecurityAsset[];
  onSelectIncident: (inc: SecurityIncident) => void;
  onNavigateToAttackLab: () => void;
}

const telemetryData = [
  { time: '00:00', logs: 14200, alerts: 5 },
  { time: '04:00', logs: 11800, alerts: 3 },
  { time: '08:00', logs: 28400, alerts: 12 },
  { time: '12:00', logs: 42100, alerts: 19 },
  { time: '16:00', logs: 39500, alerts: 14 },
  { time: '20:00', logs: 22900, alerts: 8 },
];

export const SOCDashboard: React.FC<DashboardProps> = ({
  alerts, incidents, assets, onSelectIncident, onNavigateToAttackLab
}) => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-medium">Security Score</span>
            <ShieldCheck className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">82<span className="text-sm text-gray-400 font-normal">/100</span></div>
          <div className="mt-2 h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-green-500 rounded-full" style={{ width: '82%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-medium">Open Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">{alerts.length}</div>
          <div className="text-xs text-gray-400 mt-1">+4 in last hour</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-medium">Log Ingestion</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">14.8k</div>
          <div className="text-xs text-gray-400 mt-1">events / second</div>
        </div>

        <div className="bg-blue-600 rounded-xl p-4 text-white cursor-pointer hover:bg-blue-700 transition-colors" onClick={onNavigateToAttackLab}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium opacity-90">Attack Lab</span>
          </div>
          <div className="text-sm font-semibold">Run Simulation</div>
          <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
            <span>10 scenarios available</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Chart + Assets */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Log Volume & Alert Correlation</h3>
              <p className="text-xs text-gray-400">Last 24 hours</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded font-medium">Live</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData}>
                <defs>
                  <linearGradient id="gLogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="logs" stroke="#3B82F6" strokeWidth={2} fill="url(#gLogs)" name="Log Events" />
                <Area type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={2} fill="url(#gAlerts)" name="Alerts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Asset Risk Overview</h3>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-800 truncate">{asset.name}</div>
                  <div className="text-xs text-gray-400">{asset.ipAddress}</div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <div className={`text-xs font-bold ${asset.riskScore > 75 ? 'text-red-600' : asset.riskScore > 50 ? 'text-orange-600' : 'text-green-600'}`}>
                    {asset.riskScore}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents + Alerts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Active Incidents</h3>
          <div className="space-y-2">
            {incidents.map((inc) => (
              <div key={inc.id} onClick={() => onSelectIncident(inc)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                <SeverityBadge severity={inc.severity} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-900 leading-snug truncate">{inc.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{inc.ticketNumber}</div>
                </div>
                <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                  Risk {inc.riskScore}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                <SeverityBadge severity={alert.severity} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-900 leading-snug truncate">{alert.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{alert.sourceIp} → {alert.affectedAsset}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{alert.mitreTechniqueId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
