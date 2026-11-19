import React from 'react';
import { Card } from '../ui/Card';

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = '',
}) {
  return (
    <Card className={`p-5 flex flex-col justify-between ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-brand-dark">{title}</h3>
          {subtitle && (
            <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="flex-1 w-full">{children}</div>
    </Card>
  );
}

