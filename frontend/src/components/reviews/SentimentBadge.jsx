import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

export function SentimentBadge({ sentiment = 'Positive', className = '', size = 'md' }) {
  const norm = (sentiment || '').toLowerCase();

  let label = 'Neutral';
  let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Meh;

  if (norm.includes('pos')) {
    label = norm.includes('ext') ? 'Extremely Positive' : 'Positive';
    badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    Icon = Smile;
  } else if (norm.includes('neg')) {
    label = norm.includes('ext') ? 'Extremely Negative' : 'Negative';
    badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
    Icon = Frown;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses[size]} ${badgeClass} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}
