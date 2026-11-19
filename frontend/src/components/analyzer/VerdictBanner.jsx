import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function VerdictBanner({
  verdict = 'Uncertain Review',
  confidence = 85,
  className = '',
}) {
  const isGenuine = verdict === 'Genuine Review' || verdict === 'Genuine';
  const isSuspicious = verdict === 'Suspicious Review' || verdict === 'Suspicious';

  const containerStyle = isGenuine
    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
    : isSuspicious
    ? 'bg-rose-50/80 border-rose-200 text-rose-950'
    : 'bg-amber-50/70 border-amber-200 text-amber-900';

  const IconComponent = isGenuine
    ? CheckCircle2
    : isSuspicious
    ? AlertTriangle
    : HelpCircle;

  const iconColor = isGenuine
    ? 'text-emerald-600'
    : isSuspicious
    ? 'text-rose-600'
    : 'text-amber-600';

  return (
    <div
      className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${containerStyle} ${className}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold opacity-75">
            Verdict
          </span>
          <h4 className="text-base font-bold leading-tight">
            {verdict}
          </h4>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75 block">
          Confidence
        </span>
        <span className="text-sm font-bold font-mono">
          {confidence}%
        </span>
      </div>
    </div>
  );
}

export default VerdictBanner;

