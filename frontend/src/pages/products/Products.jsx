import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { SearchInput } from '../../components/ui/SearchInput';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductDetailsModal } from '../../components/products/ProductDetailsModal';
import { MOCK_PRODUCTS } from '../../data/productsData';
import { MOCK_REVIEWS } from '../../data/reviewsData';

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
          <ProductCard
            key={prod.id}
            product={prod}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        reviews={productReviews}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
export default Products;

