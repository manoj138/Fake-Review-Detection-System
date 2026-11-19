import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { RatingStars } from '../reviews/RatingStars';
import { RiskBadge } from '../reviews/RiskBadge';
import { formatNumber } from '../../utils/formatNumber';
import { Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function ProductDetailsModal({ product, reviews = [], isOpen, onClose }) {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      subtitle={`Category: ${product.category} • SKU: ${product.sku}`}
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-end w-full">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Total Reviews
            </span>
            <span className="text-base sm:text-lg font-bold text-brand-dark mt-0.5 block">
              {formatNumber(product.totalReviews)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Average Rating
            </span>
            <span className="text-base sm:text-lg font-bold text-brand-dark mt-0.5 block flex items-center gap-1.5">
              {product.avgRating} <RatingStars rating={Math.round(product.avgRating)} size="xs" />
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Suspicious Ratio
            </span>
            <span className="text-base sm:text-lg font-bold text-rose-600 mt-0.5 block">
              {product.suspiciousPercentage}%
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Risk Status
            </span>
            <div className="mt-1">
              <RiskBadge level={product.riskStatus} size="sm" />
            </div>
          </div>
        </div>

        {/* Historical Trajectory Chart */}
        <div className="p-4 rounded-xl border border-brand-border bg-white min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
              6-Month Authenticity Trajectory
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Genuine
              </span>
              <span className="flex items-center gap-1 text-rose-600 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Suspicious
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={product.monthlyTrend}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#718096' }} />
                <YAxis tick={{ fontSize: 10, fill: '#718096' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="genuine"
                  stroke="#16A34A"
                  fill="#DCFCE7"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="suspicious"
                  stroke="#EF6464"
                  fill="#FEE2E2"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Generated Product Insights */}
        {product.aiInsights && (
          <div className="p-4 rounded-xl border border-violet-100 bg-violet-50/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5CF6]">
              <Sparkles className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
              <span>AI Reputation Analysis & Flags</span>
            </div>
            <ul className="space-y-1.5 pl-2">
              {product.aiInsights.map((insight, i) => (
                <li key={i} className="text-xs text-brand-dark flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Sample Reviews */}
        {reviews.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
              Recent Sample Submissions ({reviews.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-lg border border-brand-border bg-slate-50/60 text-xs flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <RatingStars rating={r.rating} size="xs" />
                      <span className="font-semibold text-brand-dark truncate">
                        {r.reviewer}
                      </span>
                      <span className="text-brand-muted">•</span>
                      <span className="text-brand-muted whitespace-nowrap">{r.date}</span>
                    </div>
                    <p className="text-brand-dark italic line-clamp-2">"{r.snippet}"</p>
                  </div>
                  <RiskBadge level={r.riskLevel} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
export default ProductDetailsModal;

