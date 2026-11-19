import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = Search,
  title = 'No records found',
  description = 'Try adjusting your search criteria or resetting filters.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-brand-border ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-muted mb-3 border border-brand-border">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <h4 className="text-sm font-semibold text-brand-dark">{title}</h4>
      <p className="text-xs text-brand-muted max-w-sm mt-1">{description}</p>
      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

