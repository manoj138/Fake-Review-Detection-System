import React from 'react';
import { RatingStars } from '../reviews/RatingStars';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatDate';
import { Eye } from 'lucide-react';

export function SuspiciousReviewRow({
  review,
  onInspect,
  className = '',
}) {
  if (!review) return null;

  return (
    <tr
      onClick={() => onInspect && onInspect(review)}
      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${className}`}
    >
      <td className="py-3 px-3 max-w-xs">
        <p className="font-medium text-brand-dark line-clamp-1 italic">
          "{review.snippet}"
        </p>
      </td>
      <td className="py-3 px-3 max-w-[150px]">
        <p className="font-semibold text-brand-dark truncate">
          {review.product}
        </p>
        <span className="text-[10px] text-brand-muted">
          {review.category}
        </span>
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <RatingStars rating={review.rating} size="xs" />
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          {review.fakeProbability}%
        </span>
      </td>
      <td className="py-3 px-3 max-w-[180px]">
        <span className="text-[11px] text-brand-muted truncate block">
          {review.detectionReasons?.[0]?.signal || 'High Pattern Match'}
        </span>
      </td>
      <td className="py-3 px-3 text-brand-muted whitespace-nowrap">
        {formatDate(review.date)}
      </td>
      <td className="py-3 px-3 text-right whitespace-nowrap">
        <Button
          variant="ghost"
          size="sm"
          icon={Eye}
          onClick={(e) => {
            e.stopPropagation();
            onInspect && onInspect(review);
          }}
        >
          Inspect
        </Button>
      </td>
    </tr>
  );
}

export default SuspiciousReviewRow;

