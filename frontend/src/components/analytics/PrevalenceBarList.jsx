import React from 'react';
import { Card } from '../ui/Card';
import { formatNumber } from '../../utils/formatNumber';
import { ShieldCheck } from 'lucide-react';

export function PrevalenceBarList({
  reasons = [],
  title = 'Detection Signal Prevalence',
  subtitle = 'Top 5 Heuristic Vectors',
  description = 'Frequency of identified patterns in 4,218 flagged reviews',
  className = '',
}) {
  return (
    <Card className={`p-5 flex flex-col justify-between min-w-0 ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-brand-dark">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-brand-muted">{subtitle}</span>
          )}
        </div>
        {description && (
          <p className="text-xs text-brand-muted mb-4">
            {description}
          </p>
        )}

        <div className="space-y-4">
          {reasons.map((item) => (
            <div key={item.reason} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-dark">
                  {item.reason}
                </span>
                <span className="text-brand-muted font-mono font-medium">
                  {formatNumber(item.count)} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.percentage * 2, 100)}%`,
                    backgroundColor: item.color || '#635BFF',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-brand-border mt-4 text-[11px] text-brand-muted flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        <span>Multiple signals can trigger concurrently for a single review.</span>
      </div>
    </Card>
  );
}

export default PrevalenceBarList;

