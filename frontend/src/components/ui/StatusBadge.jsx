import React from 'react';

const STATUS_CONFIGS = {
  // Review Authenticity
  genuine: {
    label: 'Genuine',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  suspicious: {
    label: 'Suspicious',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
  uncertain: {
    label: 'Uncertain',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },

  // Moderation / Reports
  pending: {
    label: 'Pending',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
  reviewed: {
    label: 'Reviewed',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  resolved: {
    label: 'Resolved',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  dismissed: {
    label: 'Dismissed',
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  },
};

export function StatusBadge({
  status = 'Genuine',
  size = 'md',
  showDot = true,
  className = '',
}) {
  const key = (status || '').toLowerCase().trim();
  const config = STATUS_CONFIGS[key] || {
    label: status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border whitespace-nowrap ${sizeStyles[size]} ${config.bg} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      <span>{config.label}</span>
    </span>
  );
}
export default StatusBadge;

