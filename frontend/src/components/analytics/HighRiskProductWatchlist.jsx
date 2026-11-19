import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatNumber } from '../../utils/formatNumber';
import { useToast } from '../../hooks/useToast';

export function HighRiskProductWatchlist({
  products = [],
  title = 'High Risk Product Watchlist',
  subtitle = 'Action Required',
  description = 'Products with highest synthetic review density',
  onNotifyCompliance,
  className = '',
}) {
  const { showToast } = useToast();

  const handleNotify = () => {
    if (onNotifyCompliance) {
      onNotifyCompliance();
    } else {
      showToast('Dispatched merchant compliance notification.', 'success');
    }
  };

  return (
    <Card className={`p-5 flex flex-col justify-between min-w-0 ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-brand-dark">
            {title}
          </h3>
          {subtitle && (
            <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {subtitle}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-brand-muted mb-4">
            {description}
          </p>
        )}

        <div className="divide-y divide-brand-border">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="py-3 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <p className="font-semibold text-brand-dark truncate">
                  {prod.name}
                </p>
                <span className="text-[10px] text-brand-muted">
                  {prod.category} • {formatNumber(prod.totalReviews)} reviews
                </span>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-bold text-rose-600 block text-sm font-mono">
                  {prod.suspiciousPercentage}%
                </span>
                <span className="text-[10px] text-brand-muted">
                  {formatNumber(prod.suspiciousReviews)} fake flagged
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-brand-border mt-4 flex items-center justify-between text-xs">
        <span className="text-brand-muted text-[11px]">
          Showing top {products.length} high-risk assets
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotify}
        >
          Notify Compliance
        </Button>
      </div>
    </Card>
  );
}

export default HighRiskProductWatchlist;

