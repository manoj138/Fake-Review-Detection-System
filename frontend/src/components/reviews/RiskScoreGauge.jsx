import React from 'react';

export function RiskScoreGauge({
  score = 0,
  size = 140,
  strokeWidth = 10,
  label = 'Fake Probability',
  showLabel = true,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = '#16A34A'; // Green / genuine
  let labelColor = 'text-emerald-600';
  let bgFill = 'fill-emerald-50/20';

  if (clampedScore >= 75) {
    strokeColor = '#EF6464'; // Red / critical
    labelColor = 'text-rose-600';
    bgFill = 'fill-rose-50/20';
  } else if (clampedScore >= 40) {
    strokeColor = '#F59E0B'; // Amber / medium
    labelColor = 'text-amber-600';
    bgFill = 'fill-amber-50/20';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E6EAF2"
            strokeWidth={strokeWidth}
            className="fill-transparent"
          />
          {/* Active progress stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out fill-transparent"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-2xl font-bold tracking-tight ${labelColor}`}>
            {clampedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted">
            Risk Score
          </span>
        </div>
      </div>

      {showLabel && label && (
        <span className="text-xs font-medium text-brand-muted mt-2 text-center">
          {label}
        </span>
      )}
    </div>
  );
}

