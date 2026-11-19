import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { SuspiciousReviewRow } from './SuspiciousReviewRow';
import { ReviewDetailsModal } from '../reviews/ReviewDetailsModal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[620px] text-left text-xs border-collapse">
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
              <SuspiciousReviewRow
                key={review.id}
                review={review}
                onInspect={setSelectedReview}
              />
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

export default RecentSuspiciousReviews;
