import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/dashboard/StatCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { AIInsightCard } from '../../components/dashboard/AIInsightCard';
import { RiskDistribution } from '../../components/dashboard/RiskDistribution';
import { RecentSuspiciousReviews } from '../../components/dashboard/RecentSuspiciousReviews';
import { ReviewTrendChart } from '../../components/charts/ReviewTrendChart';
import { SentimentChart } from '../../components/charts/SentimentChart';
import {
  DASHBOARD_STATS,
  DETECTION_TRENDS,
  SENTIMENT_DISTRIBUTION,
} from '../../data/dashboardData';
import { MOCK_REVIEWS } from '../../data/reviewsData';
import { Download } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function Dashboard() {
  const [period, setPeriod] = useState('30d');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const { showToast } = useToast();

  const handleExport = () => {
    showToast('Exporting Review Intelligence audit report (PDF / CSV)...', 'success');
  };

  const handleUpdateStatus = (reviewId, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Review Intelligence Overview"
        subtitle="Monitor review authenticity, customer sentiment, and suspicious activity in real time."
        actions={
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="inline-flex p-1 bg-white border border-brand-border rounded-lg shadow-2xs">
              {['7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    showToast(`Updated view range to last ${p.toUpperCase()}`, 'info', 2000);
                  }}
                  className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    period === p
                      ? 'bg-[#635BFF] text-white shadow-xs'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExport}
              className="flex-1 sm:flex-initial"
            >
              Export Report
            </Button>
          </div>
        }
      />

      {/* 4 Polished Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts Section: Detection Trends & Sentiment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 min-w-0">
          <ChartCard
            title="Review Detection Trends"
            subtitle={`Genuine vs suspicious reviews volume over the selected ${period} window`}
            action={
              <div className="flex items-center gap-3 sm:gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-brand-muted text-[11px] sm:text-xs">Genuine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-brand-muted text-[11px] sm:text-xs">Suspicious</span>
                </div>
              </div>
            }
          >
            <ReviewTrendChart data={DETECTION_TRENDS[period] || DETECTION_TRENDS['30d']} />
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard
            title="Sentiment Distribution"
            subtitle="Customer sentiment ratio across all analyzed feedback"
          >
            <SentimentChart data={SENTIMENT_DISTRIBUTION} />
          </ChartCard>
        </div>
      </div>

      {/* Risk Distribution & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 min-w-0">
          <RiskDistribution />
        </div>

        <div className="min-w-0">
          <AIInsightCard />
        </div>
      </div>

      {/* Recent Suspicious Reviews Table */}
      <div className="min-w-0">
        <RecentSuspiciousReviews
          reviews={reviews}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
}
export default Dashboard;
