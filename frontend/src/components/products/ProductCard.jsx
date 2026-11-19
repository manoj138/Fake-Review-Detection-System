import React from 'react';
import { Card } from '../ui/Card';
import { RatingStars } from '../reviews/RatingStars';
import { RiskBadge } from '../reviews/RiskBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { formatNumber } from '../../utils/formatNumber';
import { ChevronRight } from 'lucide-react';

export function ProductCard({ product, onSelect }) {
  if (!product) return null;

  return (
    <Card
      hover
      onClick={() => onSelect && onSelect(product)}
      className="p-5 cursor-pointer flex flex-col justify-between transition-all hover:border-indigo-300"
    >
      <div>
        {/* Header: Category and Risk Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted px-2 py-0.5 rounded bg-slate-100 border border-brand-border">
            {product.category}
          </span>
          <RiskBadge level={product.riskStatus} size="sm" />
        </div>

        {/* Product Title & SKU */}
        <h3 className="text-sm font-bold text-brand-dark line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-brand-muted mb-4 font-mono">
          SKU: {product.sku}
        </p>

        {/* Ratings and Total Count Box */}
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 border border-brand-border mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <RatingStars rating={Math.round(product.avgRating)} size="xs" />
            <span className="font-bold text-brand-dark">{product.avgRating}</span>
          </div>
          <span className="text-brand-muted">
            {formatNumber(product.totalReviews)} reviews
          </span>
        </div>

        {/* Suspicious ratio bar */}
        <div className="space-y-1.5 text-xs mb-4">
          <div className="flex items-center justify-between">
            <span className="text-brand-muted">Suspicious Reviews</span>
            <span className="font-bold text-rose-600">
              {product.suspiciousPercentage}% ({formatNumber(product.suspiciousReviews)})
            </span>
          </div>
          <ProgressBar
            value={product.suspiciousPercentage}
            height="sm"
            variant="danger"
          />
        </div>
      </div>

      {/* Bottom Card Action */}
      <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-[#635BFF] font-semibold">
        <span>View Product Intelligence</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}
export default ProductCard;

