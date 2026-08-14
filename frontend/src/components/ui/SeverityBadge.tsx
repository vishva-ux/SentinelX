import type { SeverityLevel } from '../../types';

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const styles: Record<SeverityLevel, string> = {
    Critical: 'bg-red-50 text-red-700 ring-1 ring-red-200',
    High: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
    Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    Low: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    Info: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${styles[severity]}`}>
      {severity}
    </span>
  );
};
