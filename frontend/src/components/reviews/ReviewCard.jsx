import React from 'react';
import { Card } from '../ui/Card';
import { RatingStars } from './RatingStars';
import { RiskBadge } from './RiskBadge';
import { SentimentBadge } from './SentimentBadge';
import { formatDate } from '../../utils/formatDate';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export function ReviewCard({ review, onClick }) {
  return (
    <Card
      hover
      onClick={onClick}
      className="p-4 cursor-pointer transition-all hover:border-indigo-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider">
            {review.category}
          </span>
          <h4 className="text-sm font-semibold text-brand-dark line-clamp-1">
            {review.product}
          </h4>
        </div>
        <RiskBadge level={review.riskLevel} size="sm" />
      </div>

      <div className="flex items-center gap-2 mb-2.5">
        <RatingStars rating={review.rating} size="xs" />
        <span className="text-xs text-brand-muted">•</span>
        <span className="text-xs text-brand-muted">{formatDate(review.date)}</span>
        {review.verified && (
          <span className="inline-flex items-center text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-100 font-medium">
            <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
            Verified
          </span>
        )}
      </div>

      <p className="text-xs text-brand-dark line-clamp-2 italic mb-3 leading-relaxed">
        "{review.snippet}"
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs">
        <SentimentBadge sentiment={review.sentiment} size="sm" />
        <div className="flex items-center gap-1 text-[#635BFF] font-medium text-xs">
          <span>{review.fakeProbability}% Risk</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Card>
  );
}

