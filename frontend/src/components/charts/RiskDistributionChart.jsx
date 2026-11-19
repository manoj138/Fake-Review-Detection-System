import React from 'react';
import { formatNumber } from '../../utils/formatNumber';

export function RiskDistributionChart({ data = [] }) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.level} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-semibold text-brand-dark">{item.level}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-muted">
              <span>{formatNumber(item.count)} reviews</span>
              <span className="font-semibold text-brand-dark">({item.percentage}%)</span>
            </div>
          </div>

          {/* Progress bar container */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${item.bgClass || ''}`}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
