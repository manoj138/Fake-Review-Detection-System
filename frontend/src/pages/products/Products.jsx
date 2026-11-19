import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { RatingStars } from '../../components/reviews/RatingStars';
import { RiskBadge } from '../../components/reviews/RiskBadge';
import { MOCK_PRODUCTS } from '../../data/productsData';
import { MOCK_REVIEWS } from '../../data/reviewsData';
import { formatNumber } from '../../utils/formatNumber';
import {
  Package,
  Layers,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  BarChart2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function Products() {
  const [products] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Electronics', 'Home Appliances', 'Cosmetics', 'Furniture'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesSku) return false;
      }
      if (categoryFilter !== 'All' && p.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [products, search, categoryFilter]);

  // Associated reviews for selected product in modal
  const productReviews = useMemo(() => {
    if (!selectedProduct) return [];
    return MOCK_REVIEWS.filter((r) => r.productId === selectedProduct.id);
  }, [selectedProduct]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Product Intelligence"
        subtitle="Track review authenticity, reputation risk, and synthetic review density across all catalog products."
      />

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <SearchInput
              size="sm"
              placeholder="Search products by title, category, or SKU..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-xs text-brand-muted hidden sm:inline flex-shrink-0">Category:</span>
            <div className="flex items-center gap-1.5 flex-nowrap sm:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 min-h-[34px] text-xs font-medium rounded-lg transition-colors flex-shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-[#635BFF] text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-brand-dark hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <Card
            key={prod.id}
            hover
            onClick={() => setSelectedProduct(prod)}
            className="p-5 cursor-pointer flex flex-col justify-between transition-all hover:border-indigo-300"
          >
            <div>
              {/* Card Header with category badge & risk badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted px-2 py-0.5 rounded bg-slate-100 border border-brand-border">
                  {prod.category}
                </span>
                <RiskBadge level={prod.riskStatus} size="sm" />
              </div>

              {/* Product Title & SKU */}
              <h3 className="text-sm font-bold text-brand-dark line-clamp-1 mb-1">
                {prod.name}
              </h3>
              <p className="text-[11px] text-brand-muted mb-4 font-mono">
                SKU: {prod.sku}
              </p>

              {/* Ratings and Total Count */}
              <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 border border-brand-border mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={Math.round(prod.avgRating)} size="xs" />
                  <span className="font-bold text-brand-dark">{prod.avgRating}</span>
                </div>
                <span className="text-brand-muted">
                  {formatNumber(prod.totalReviews)} reviews
                </span>
              </div>

              {/* Suspicious ratio breakdown */}
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-brand-muted">Suspicious Reviews</span>
                  <span className="font-bold text-rose-600">
                    {prod.suspiciousPercentage}% ({formatNumber(prod.suspiciousReviews)})
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      prod.suspiciousPercentage >= 30
                        ? 'bg-rose-500'
                        : prod.suspiciousPercentage >= 15
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${prod.suspiciousPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-[#635BFF] font-semibold">
              <span>View Product Intelligence</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
          subtitle={`Category: ${selectedProduct.category} • SKU: ${selectedProduct.sku}`}
          maxWidth="max-w-3xl"
          footer={
            <div className="flex items-center justify-end w-full">
              <Button variant="secondary" size="sm" onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Total Reviews
                </span>
                <span className="text-lg font-bold text-brand-dark mt-0.5 block">
                  {formatNumber(selectedProduct.totalReviews)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Average Rating
                </span>
                <span className="text-lg font-bold text-brand-dark mt-0.5 block flex items-center gap-1.5">
                  {selectedProduct.avgRating} <RatingStars rating={Math.round(selectedProduct.avgRating)} size="xs" />
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Suspicious Ratio
                </span>
                <span className="text-lg font-bold text-rose-600 mt-0.5 block">
                  {selectedProduct.suspiciousPercentage}%
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Risk Status
                </span>
                <div className="mt-1">
                  <RiskBadge level={selectedProduct.riskStatus} />
                </div>
              </div>
            </div>

            {/* Historical Trend Chart */}
            <div className="p-4 rounded-xl border border-brand-border bg-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  6-Month Authenticity Trajectory
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Genuine
                  </span>
                  <span className="flex items-center gap-1 text-rose-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Suspicious
                  </span>
                </div>
              </div>
              <div style={{ width: '100%', height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={selectedProduct.monthlyTrend}
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
            <div className="p-4 rounded-xl border border-violet-100 bg-violet-50/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5CF6]">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <span>AI Reputation Analysis & Flags</span>
              </div>
              <ul className="space-y-1.5 pl-2">
                {selectedProduct.aiInsights.map((insight, i) => (
                  <li key={i} className="text-xs text-brand-dark flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Sample Reviews */}
            {productReviews.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                  Recent Sample Submissions ({productReviews.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {productReviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg border border-brand-border bg-slate-50/60 text-xs flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <RatingStars rating={r.rating} size="xs" />
                          <span className="font-semibold text-brand-dark">
                            {r.reviewer}
                          </span>
                          <span className="text-brand-muted">•</span>
                          <span className="text-brand-muted">{r.date}</span>
                        </div>
                        <p className="text-brand-dark italic">"{r.snippet}"</p>
                      </div>
                      <RiskBadge level={r.riskLevel} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Products;

