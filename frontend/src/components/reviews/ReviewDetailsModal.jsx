import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { RatingStars } from './RatingStars';
import { RiskBadge } from './RiskBadge';
import { SentimentBadge } from './SentimentBadge';
import { RiskScoreGauge } from './RiskScoreGauge';
import { DetectionReasonList } from './DetectionReasonList';
import { formatDate } from '../../utils/formatDate';
import { CheckCircle2, ShieldAlert, Flag, UserCheck, Sparkles } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ReviewDetailsModal({ review, isOpen, onClose, onUpdateStatus }) {
  const { showToast } = useToast();

  if (!review) return null;

  const handleAction = (newStatus, message) => {
    if (onUpdateStatus) {
      onUpdateStatus(review.id, newStatus);
    }
    showToast(message, newStatus === 'Suspicious' ? 'warning' : 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Authenticity Audit"
      subtitle={`Review ID: ${review.id} • Submitted on ${formatDate(review.date)}`}
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Flag}
              onClick={() => handleAction('Suspicious', `Flagged review ${review.id} for manual audit.`)}
            >
              Flag Suspicious
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={UserCheck}
              onClick={() => handleAction('Genuine', `Verified review ${review.id} as genuine.`)}
            >
              Mark Genuine
            </Button>
          </div>
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Product & Reviewer Header */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
              {review.category || 'Product'}
            </span>
            <h4 className="text-sm font-semibold text-brand-dark mt-0.5">
              {review.product}
            </h4>
            <div className="flex items-center gap-3 mt-1.5">
              <RatingStars rating={review.rating} size="sm" />
              <span className="text-xs font-semibold text-brand-dark">{review.rating}.0 / 5.0</span>
              <span className="text-xs text-brand-muted">•</span>
              <span className="text-xs text-brand-muted">by {review.reviewer || 'Anonymous'}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Buyer
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RiskBadge level={review.riskLevel} />
            <SentimentBadge sentiment={review.sentiment} />
          </div>
        </div>

        {/* Review Content Card */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
            Review Content
          </label>
          <div className="p-4 rounded-xl bg-white border border-brand-border text-sm text-brand-dark leading-relaxed font-normal italic shadow-2xs">
            "{review.snippet}"
          </div>
        </div>

        {/* AI Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center p-5 rounded-xl border border-brand-border bg-gradient-to-br from-white to-slate-50">
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-brand-border pb-4 md:pb-0 md:pr-4">
            <RiskScoreGauge score={review.fakeProbability || 0} size={130} />
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5CF6]">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>AI Detection Signals & Reasoning</span>
            </div>
            <DetectionReasonList reasons={review.detectionReasons} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
