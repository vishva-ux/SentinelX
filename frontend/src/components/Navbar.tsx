import React from 'react';
import { Shield, Search, Activity, Terminal, AlertTriangle, Grid3x3, Zap, Server, Flame, FileText } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: Activity },
  { id: 'siem', label: 'Log Explorer', icon: Terminal },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  { id: 'matrix', label: 'MITRE Matrix', icon: Grid3x3 },
  { id: 'attacklab', label: 'Attack Lab', icon: Zap },
  { id: 'assets', label: 'Assets', icon: Server },
  { id: 'threatintel', label: 'Threat Intel', icon: Flame },
  { id: 'audit', label: 'Audit Log', icon: FileText },
];

export const Navbar: React.FC<NavbarProps & { onOpenCommandPalette?: () => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight">SentinelX</span>
          <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-medium">SOC & SIEM</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search alerts, assets, IOCs…"
            className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-72 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>

        <div />
      </div>

      <nav className="flex items-center px-6 border-t border-gray-100">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
