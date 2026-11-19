import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { Card } from '../../components/ui/Card';
import { DateRangeSelector } from '../../components/ui/DateRangeSelector';
import { ExportButton } from '../../components/ui/ExportButton';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ReviewTrendChart } from '../../components/charts/ReviewTrendChart';
import { SentimentChart } from '../../components/charts/SentimentChart';
import { RatingChart } from '../../components/charts/RatingChart';
import { CategoryComparisonChart } from '../../components/charts/CategoryComparisonChart';
import { PrevalenceBarList } from '../../components/analytics/PrevalenceBarList';
import { HighRiskProductWatchlist } from '../../components/analytics/HighRiskProductWatchlist';
import {
  CATEGORY_COMPARISON,
  RATING_AUTHENTICITY,
  DETECTION_REASONS_BREAKDOWN,
} from '../../data/analyticsData';
import {
  DETECTION_TRENDS,
  SENTIMENT_DISTRIBUTION,
} from '../../data/dashboardData';
import { MOCK_PRODUCTS } from '../../data/productsData';
import { formatNumber } from '../../utils/formatNumber';
import { Download, ShieldCheck } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function TrustAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const { showToast } = useToast();

  // Top suspicious products
  const topSuspiciousProducts = [...MOCK_PRODUCTS]
    .sort((a, b) => b.suspiciousPercentage - a.suspiciousPercentage)
    .slice(0, 4);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Trust & Safety Analytics"
        subtitle="Understand authenticity patterns, bot injection behavior, and cross-category fraud vectors."
        actions={
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <DateRangeSelector
              value={timeRange}
              onChange={(range) => {
                setTimeRange(range);
                showToast(`Analytics filtered to last ${range.toUpperCase()}`, 'info', 1800);
              }}
            />

            <ExportButton
              label="Export Analytics"
              onExport={(fmt) =>
                showToast(`Exported ${timeRange.toUpperCase()} analytics metrics (${fmt.toUpperCase()}).`, 'success')
              }
            />
          </div>
        }
      />

      {/* Row 1: Fake vs Genuine Trends & Sentiment Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 min-w-0">
          <ChartCard
            title="Authenticity Trajectory"
            subtitle="Daily volume comparison of verified organic vs flagged synthetic reviews"
          >
            <ReviewTrendChart data={DETECTION_TRENDS[timeRange] || DETECTION_TRENDS['30d']} height={280} />
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard
            title="Sentiment Breakdown"
            subtitle="Overall polarity distribution of customer submissions"
          >
            <SentimentChart data={SENTIMENT_DISTRIBUTION} height={230} />
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Category Comparison & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="min-w-0">
          <ChartCard
            title="Suspicious Activity by Product Category"
            subtitle="Percentage of flagged reviews identified across main e-commerce verticals"
          >
            <CategoryComparisonChart data={CATEGORY_COMPARISON} height={260} />
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard
            title="Rating Distribution Authenticity"
            subtitle="Fake review clustering across 1-star through 5-star ratings"
          >
            <RatingChart data={RATING_AUTHENTICITY} height={260} />
          </ChartCard>
        </div>
      </div>

      {/* Row 3: Detection Reasons Breakdown & Top Suspicious Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <PrevalenceBarList
          reasons={DETECTION_REASONS_BREAKDOWN}
        />

        <HighRiskProductWatchlist
          products={topSuspiciousProducts}
          onNotifyCompliance={() =>
            showToast('Dispatched merchant compliance notification.', 'success')
          }
        />
      </div>
    </div>
  );
}
export default TrustAnalytics;
