import React from 'react';

export function SkeletonLoader({
  type = 'text',
  lines = 3,
  height,
  width,
  className = '',
}) {
  const baseClasses = 'animate-pulse bg-slate-200/80 rounded';

  if (type === 'card') {
    return (
      <div className={`p-5 bg-white rounded-xl border border-brand-border space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse" />
        </div>
        <div className="w-32 h-7 bg-slate-200 rounded animate-pulse mt-2" />
        <div className="w-40 h-3 bg-slate-200 rounded animate-pulse mt-3" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`space-y-3 p-4 bg-white rounded-xl border border-brand-border ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
            <div className="w-1/3 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="w-1/4 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="w-16 h-4 bg-slate-200 rounded animate-pulse ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div
        className={`w-full bg-slate-100/70 rounded-xl border border-brand-border flex items-center justify-center animate-pulse ${className}`}
        style={{ height: height || 240 }}
      >
        <span className="text-xs text-brand-muted font-medium">Loading visualization...</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, idx) => (
        <div
          key={idx}
          className={`${baseClasses} ${idx === lines - 1 ? 'w-2/3' : 'w-full'}`}
          style={{ height: height || 14, width: idx === 0 && width ? width : undefined }}
        />
      ))}
    </div>
  );
}
export default SkeletonLoader;

