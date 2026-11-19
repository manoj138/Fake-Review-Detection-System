import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { RatingStars } from '../reviews/RatingStars';
import { RiskBadge } from '../reviews/RiskBadge';
import { ReviewDetailsModal } from '../reviews/ReviewDetailsModal';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

export function RecentSuspiciousReviews({ reviews = [], onUpdateStatus, className = '' }) {
  const [selectedReview, setSelectedReview] = useState(null);

  // Filter to show most suspicious recent reviews
  const suspiciousList = reviews
    .filter((r) => r.status === 'Suspicious' || r.riskLevel === 'Critical' || r.riskLevel === 'High')
    .slice(0, 5);

  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-brand-dark">
              Recent Suspicious Reviews
            </h4>
            <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Needs Review
            </span>
          </div>
          <p className="text-xs text-brand-muted mt-0.5">
            Flagged by automated NLP and duplicate heuristic models
          </p>
        </div>

        <Link
          to="/reviews"
          className="text-xs font-semibold text-[#635BFF] hover:underline inline-flex items-center gap-1"
        >
          <span>View All Reviews</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-brand-border bg-slate-50/70 text-brand-muted uppercase font-semibold">
              <th className="py-2.5 px-3">Review Snippet</th>
              <th className="py-2.5 px-3">Product</th>
              <th className="py-2.5 px-3">Rating</th>
              <th className="py-2.5 px-3">Risk Score</th>
              <th className="py-2.5 px-3">Detection Reason</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {suspiciousList.map((review) => (
              <tr
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
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
                      setSelectedReview(review);
                    }}
                  >
                    Inspect
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReviewDetailsModal
        review={selectedReview}
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        onUpdateStatus={onUpdateStatus}
      />
    </Card>
  );
}
