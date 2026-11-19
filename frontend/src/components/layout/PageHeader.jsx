import React from 'react';

export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  className = '',
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ${className}`}>
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center flex-wrap gap-2.5">
          {actions}
        </div>
      )}
    </div>
  );
}
