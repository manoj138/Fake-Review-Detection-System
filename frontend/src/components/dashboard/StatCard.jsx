import React from 'react';
import { Card } from '../ui/Card';
import { MetricDelta } from '../ui/MetricDelta';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber';

const ICON_MAP = {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Target,
};

export function StatCard({
  title,
  value,
  growth,
  isPositive = true,
  accent = 'primary',
  icon = 'FileText',
  comparisonLabel = 'vs. previous period',
}) {
  const IconComponent = ICON_MAP[icon] || FileText;

  const accentStyles = {
    primary: {
      bg: 'bg-indigo-50 text-[#635BFF]',
      border: 'border-indigo-100',
    },
    success: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100',
    },
    danger: {
      bg: 'bg-rose-50 text-rose-600',
      border: 'border-rose-100',
    },
    ai: {
      bg: 'bg-violet-50 text-[#8B5CF6]',
      border: 'border-violet-100',
    },
  };

  const currentAccent = accentStyles[accent] || accentStyles.primary;
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <Card hover className="p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            {title}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight mt-1.5">
            {displayValue}
          </h3>
        </div>

        <div
          className={`p-2.5 rounded-xl border ${currentAccent.bg} ${currentAccent.border}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border/60">
        <MetricDelta
          value={growth}
          isPositive={isPositive}
          comparisonLabel={comparisonLabel}
          size="sm"
        />
      </div>
    </Card>
  );
}
export default StatCard;
