import React from 'react';
import { RatingStars } from './RatingStars';
import { RiskBadge } from './RiskBadge';
import { SentimentBadge } from './SentimentBadge';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatDate';
import { Eye } from 'lucide-react';

export function ReviewTableRow({
  review,
  onInspect,
  showAction = true,
  actionLabel = 'Details',
  className = '',
}) {
  if (!review) return null;

  const getProbabilityColor = (prob) => {
    if (prob >= 75) return 'text-rose-600 font-bold';
    if (prob >= 40) return 'text-amber-600 font-bold';
    return 'text-emerald-600 font-bold';
  };

  return (
    <tr
      onClick={() => onInspect && onInspect(review)}
      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${className}`}
    >
      {/* Review Content */}
      <td className="py-3.5 px-4 max-w-xs">
        <p className="font-normal text-brand-dark line-clamp-2 italic leading-relaxed text-xs">
          "{review.snippet}"
        </p>
        <span className="text-[10px] text-brand-muted mt-1 block">
          by {review.reviewer || 'Anonymous'} {review.verified ? '• (Verified Buyer)' : ''}
        </span>
      </td>

      {/* Target Product */}
      <td className="py-3.5 px-4 max-w-[170px]">
        <p className="font-semibold text-brand-dark truncate text-xs">
          {review.product}
        </p>
        <span className="text-[10px] text-brand-muted">
          {review.category}
        </span>
      </td>

      {/* Rating */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <RatingStars rating={review.rating} size="xs" />
      </td>

      {/* Sentiment */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <SentimentBadge sentiment={review.sentiment} size="sm" />
      </td>

      {/* Fake Probability */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className={getProbabilityColor(review.fakeProbability)}>
          {review.fakeProbability}%
        </span>
      </td>

      {/* Risk Badge */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <RiskBadge level={review.riskLevel} size="sm" />
      </td>

      {/* Status Badge */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <StatusBadge status={review.status} size="sm" />
      </td>

      {/* Date */}
      <td className="py-3.5 px-4 text-brand-muted whitespace-nowrap text-xs">
        {formatDate(review.date)}
      </td>

      {/* Action */}
      {showAction && (
        <td className="py-3.5 px-4 text-right whitespace-nowrap">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={(e) => {
              e.stopPropagation();
              onInspect && onInspect(review);
            }}
          >
            {actionLabel}
          </Button>
        </td>
      )}
    </tr>
  );
}
export default ReviewTableRow;

