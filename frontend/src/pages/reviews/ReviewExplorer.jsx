import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { RatingStars } from '../../components/reviews/RatingStars';
import { RiskBadge } from '../../components/reviews/RiskBadge';
import { SentimentBadge } from '../../components/reviews/SentimentBadge';
import { ReviewDetailsModal } from '../../components/reviews/ReviewDetailsModal';
import { Pagination } from '../../components/ui/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_REVIEWS } from '../../data/reviewsData';
import { useFilters } from '../../hooks/useFilters';
import { usePagination } from '../../hooks/usePagination';
import { formatDate } from '../../utils/formatDate';
import { useLocation } from 'react-router-dom';
import {
  Search,
  RotateCcw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ReviewExplorer() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState(null);
  const location = useLocation();
  const { showToast } = useToast();

  const { filters, filteredData, updateFilter, resetFilters, isFiltered } =
    useFilters(reviews);

  const {
    currentPage,
    totalPages,
    rowsPerPage,
    paginatedData,
    totalItems,
    goToPage,
    changeRowsPerPage,
  } = usePagination(filteredData, 8);

  // Sync search query param if navigated from Header
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      updateFilter('search', query);
    }
  }, [location.search]);

  const handleUpdateStatus = (reviewId, newStatus) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status: newStatus,
              riskLevel: newStatus === 'Genuine' ? 'Low' : 'Critical',
              fakeProbability: newStatus === 'Genuine' ? 8 : 94,
            }
          : r
      )
    );
  };

  // Metrics summary
  const totalCount = reviews.length;
  const genuineCount = reviews.filter((r) => r.status === 'Genuine').length;
  const suspiciousCount = reviews.filter((r) => r.status === 'Suspicious').length;
  const uncertainCount = reviews.filter((r) => r.status === 'Uncertain').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Review Explorer"
        subtitle="Explore, filter and monitor customer reviews across products with multidimensional heuristic filters."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <Card
          hover
          onClick={() => updateFilter('status', 'All')}
          className={`p-4 cursor-pointer transition-all ${
            filters.status === 'All' ? 'border-[#635BFF] ring-1 ring-[#635BFF]' : ''
          }`}
        >
          <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
            All Reviews
          </span>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{totalCount}</h3>
          <span className="text-[11px] text-brand-muted mt-1 block">Full repository</span>
        </Card>

        <Card
          hover
          onClick={() => updateFilter('status', 'Genuine')}
          className={`p-4 cursor-pointer transition-all ${
            filters.status === 'Genuine' ? 'border-emerald-500 ring-1 ring-emerald-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Genuine
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{genuineCount}</h3>
          <span className="text-[11px] text-emerald-600 mt-1 block">Verified authentic</span>
        </Card>

        <Card
          hover
          onClick={() => updateFilter('status', 'Suspicious')}
          className={`p-4 cursor-pointer transition-all ${
            filters.status === 'Suspicious' ? 'border-rose-500 ring-1 ring-rose-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
              Suspicious
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{suspiciousCount}</h3>
          <span className="text-[11px] text-rose-600 mt-1 block">Flagged for risk</span>
        </Card>

        <Card
          hover
          onClick={() => updateFilter('status', 'Uncertain')}
          className={`p-4 cursor-pointer transition-all ${
            filters.status === 'Uncertain' ? 'border-amber-500 ring-1 ring-amber-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Pending Review
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{uncertainCount}</h3>
          <span className="text-[11px] text-amber-600 mt-1 block">Borderline score</span>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search Field */}
          <div className="flex-1 min-w-[220px]">
            <SearchInput
              size="sm"
              placeholder="Filter by keyword, product name, or reviewer..."
              value={filters.search}
              onChange={(val) => updateFilter('search', val)}
            />
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-wrap">
            <Select
              size="sm"
              value={filters.status}
              onChange={(val) => updateFilter('status', val)}
              options={[
                { value: 'All', label: 'Status: All' },
                { value: 'Genuine', label: 'Genuine Only' },
                { value: 'Suspicious', label: 'Suspicious Only' },
                { value: 'Uncertain', label: 'Pending Review' },
              ]}
            />

            <Select
              size="sm"
              value={filters.riskLevel}
              onChange={(val) => updateFilter('riskLevel', val)}
              options={[
                { value: 'All', label: 'Risk: All' },
                { value: 'Low', label: 'Low Risk' },
                { value: 'Medium', label: 'Medium Risk' },
                { value: 'High', label: 'High Risk' },
                { value: 'Critical', label: 'Critical Risk' },
              ]}
            />

            <Select
              size="sm"
              value={filters.sentiment}
              onChange={(val) => updateFilter('sentiment', val)}
              options={[
                { value: 'All', label: 'Sentiment: All' },
                { value: 'Positive', label: 'Positive' },
                { value: 'Neutral', label: 'Neutral' },
                { value: 'Negative', label: 'Negative' },
              ]}
            />

            <Select
              size="sm"
              value={filters.rating}
              onChange={(val) => updateFilter('rating', val)}
              options={[
                { value: 'All', label: 'Rating: All' },
                { value: '5', label: '5 Stars' },
                { value: '4', label: '4 Stars' },
                { value: '3', label: '3 Stars' },
                { value: '2', label: '2 Stars' },
                { value: '1', label: '1 Star' },
              ]}
            />
          </div>

          {/* Reset Filters CTA */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={() => {
                resetFilters();
                showToast('Filters reset.', 'info', 2000);
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </Card>

      {/* Main Table */}
      {paginatedData.length === 0 ? (
        <EmptyState
          title="No reviews match your filters"
          description="Try broadening your search term or resetting the risk and status dropdowns."
          actionLabel="Clear All Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="bg-white rounded-xl border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-border bg-slate-50/80 text-brand-muted uppercase font-semibold">
                  <th className="py-3 px-4">Review Content</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Sentiment</th>
                  <th className="py-3 px-4">Fake Prob.</th>
                  <th className="py-3 px-4">Risk</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-dark">
                {paginatedData.map((review) => (
                  <tr
                    key={review.id}
                    onClick={() => setSelectedReview(review)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-normal text-brand-dark line-clamp-2 italic leading-relaxed">
                        "{review.snippet}"
                      </p>
                      <span className="text-[10px] text-brand-muted mt-1 block">
                        by {review.reviewer} {review.verified ? '• (Verified)' : ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[170px]">
                      <p className="font-semibold text-brand-dark truncate">
                        {review.product}
                      </p>
                      <span className="text-[10px] text-brand-muted">
                        {review.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <RatingStars rating={review.rating} size="xs" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <SentimentBadge sentiment={review.sentiment} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-bold">
                      <span
                        className={
                          review.fakeProbability >= 70
                            ? 'text-rose-600'
                            : review.fakeProbability >= 40
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }
                      >
                        {review.fakeProbability}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <RiskBadge level={review.riskLevel} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          review.status === 'Genuine'
                            ? 'bg-emerald-50 text-emerald-700'
                            : review.status === 'Suspicious'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted whitespace-nowrap">
                      {formatDate(review.date)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReview(review);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
            onPageChange={goToPage}
            onRowsPerPageChange={changeRowsPerPage}
          />
        </div>
      )}

      {/* Review Details Inspection Modal */}
      <ReviewDetailsModal
        review={selectedReview}
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
export default ReviewExplorer;

