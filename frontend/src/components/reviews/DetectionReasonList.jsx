import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export function DetectionReasonList({ reasons = [], className = '' }) {
  if (!reasons || reasons.length === 0) {
    return (
      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>No anomalous patterns or risk triggers detected. Review text demonstrates organic phrasing.</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      {reasons.map((reason, idx) => {
        const severity = reason.severity || 'high';

        let icon = <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />;
        let pillClass = 'bg-rose-50 text-rose-700 border-rose-200';
        let cardBg = 'bg-white border-brand-border';

        if (severity === 'critical') {
          icon = <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />;
          pillClass = 'bg-red-100 text-red-800 border-red-300 font-semibold';
          cardBg = 'bg-rose-50/30 border-rose-200';
        } else if (severity === 'medium' || severity === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />;
          pillClass = 'bg-amber-50 text-amber-700 border-amber-200';
        } else if (severity === 'info') {
          icon = <Info className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />;
          pillClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        }

        return (
          <div
            key={idx}
            className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${cardBg}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-brand-dark">
                  {reason.signal}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${pillClass}`}
                >
                  {severity}
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
