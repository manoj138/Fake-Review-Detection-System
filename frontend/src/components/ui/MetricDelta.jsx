import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function MetricDelta({
  value,
  isPositive = true,
  comparisonLabel,
  size = 'sm',
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
  };

  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={`flex items-center gap-1.5 ${sizeStyles[size]} ${className}`}>
      <span
        className={`inline-flex items-center font-semibold ${
          isPositive ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        <Icon className="w-3.5 h-3.5 mr-0.5" />
        {value}
      </span>
      {comparisonLabel && (
        <span className="text-brand-muted text-[11px] sm:text-xs">
          {comparisonLabel}
        </span>
      )}
    </div>
  );
}
export default MetricDelta;

