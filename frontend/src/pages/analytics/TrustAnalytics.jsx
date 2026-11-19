import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ReviewTrendChart } from '../../components/charts/ReviewTrendChart';
import { SentimentChart } from '../../components/charts/SentimentChart';
import { RatingChart } from '../../components/charts/RatingChart';
import { CategoryComparisonChart } from '../../components/charts/CategoryComparisonChart';
import { RiskDistributionChart } from '../../components/charts/RiskDistributionChart';
import {
  CATEGORY_COMPARISON,
  RATING_AUTHENTICITY,
  DETECTION_REASONS_BREAKDOWN,
  HOURLY_SUSPICIOUS_HEAT,
} from '../../data/analyticsData';
import {
  DETECTION_TRENDS,
  SENTIMENT_DISTRIBUTION,
  RISK_DISTRIBUTION,
} from '../../data/dashboardData';
import { MOCK_PRODUCTS } from '../../data/productsData';
import { formatNumber } from '../../utils/formatNumber';
import { Download, ShieldCheck, AlertCircle, BarChart3, TrendingUp } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function TrustAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const { showToast } = useToast();

  const handleExport = () => {
    showToast('Exporting Trust & Safety Analytics package (CSV / JSON)...', 'success');
  };

  // Top suspicious products
  const topSuspiciousProducts = [...MOCK_PRODUCTS]
    .sort((a, b) => b.suspiciousPercentage - a.suspiciousPercentage)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Trust & Safety Analytics"
        subtitle="Understand authenticity patterns, bot injection behavior, and cross-category fraud vectors."
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-white border border-brand-border rounded-lg shadow-2xs">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    showToast(`Analytics filtered to last ${range.toUpperCase()}`, 'info', 1800);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-[#635BFF] text-white shadow-xs'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  Last {range.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExport}
            >
              Export Analytics
            </Button>
          </div>
        }
      />

      {/* Row 1: Fake vs Genuine Trends & Sentiment Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Authenticity Trajectory"
            subtitle="Daily volume comparison of verified organic vs flagged synthetic reviews"
          >
            <ReviewTrendChart data={DETECTION_TRENDS[timeRange] || DETECTION_TRENDS['30d']} height={280} />
          </ChartCard>
        </div>

        <div>
          <ChartCard
            title="Sentiment Breakdown"
            subtitle="Overall polarity distribution of customer submissions"
          >
            <SentimentChart data={SENTIMENT_DISTRIBUTION} height={230} />
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Category Comparison & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Suspicious Activity by Product Category"
          subtitle="Percentage of flagged reviews identified across main e-commerce verticals"
        >
          <CategoryComparisonChart data={CATEGORY_COMPARISON} height={260} />
        </ChartCard>

        <ChartCard
          title="Rating Distribution Authenticity"
          subtitle="Fake review clustering across 1-star through 5-star ratings"
        >
          <RatingChart data={RATING_AUTHENTICITY} height={260} />
        </ChartCard>
      </div>

      {/* Row 3: Detection Reasons Breakdown & Top Suspicious Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Reasons */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-brand-dark">
                Detection Signal Prevalence
              </h3>
              <span className="text-xs text-brand-muted">Top 5 Heuristic Vectors</span>
            </div>
            <p className="text-xs text-brand-muted mb-4">
              Frequency of identified patterns in 4,218 flagged reviews
            </p>

            <div className="space-y-4">
              {DETECTION_REASONS_BREAKDOWN.map((reason) => (
                <div key={reason.reason} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-dark">
                      {reason.reason}
                    </span>
                    <span className="text-brand-muted font-mono font-medium">
                      {formatNumber(reason.count)} ({reason.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${reason.percentage * 2}%`,
                        backgroundColor: reason.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border mt-4 text-[11px] text-brand-muted flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multiple signals can trigger concurrently for a single review.</span>
          </div>
        </Card>

        {/* Top Suspicious Products Table */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-brand-dark">
                High Risk Product Watchlist
              </h3>
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Action Required
              </span>
            </div>
            <p className="text-xs text-brand-muted mb-4">
              Products with highest synthetic review density
            </p>

            <div className="divide-y divide-brand-border">
              {topSuspiciousProducts.map((prod) => (
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
                    <span className="font-bold text-rose-600 block text-sm">
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
              Showing top 4 high-risk assets
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => showToast('Dispatched merchant compliance notification.', 'success')}
            >
              Notify Compliance
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default TrustAnalytics;
