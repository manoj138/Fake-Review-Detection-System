import { useState, useMemo } from 'react';

const INITIAL_FILTERS = {
  search: '',
  status: 'All',
  riskLevel: 'All',
  sentiment: 'All',
  rating: 'All',
  sortBy: 'date-desc',
};

export function useFilters(initialData = []) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesSnippet = item.snippet?.toLowerCase().includes(query);
        const matchesProduct = item.product?.toLowerCase().includes(query);
        const matchesReviewer = item.reviewer?.toLowerCase().includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        if (!matchesSnippet && !matchesProduct && !matchesReviewer && !matchesCategory) {
          return false;
        }
      }

      // Status
      if (filters.status !== 'All') {
        if (item.status?.toLowerCase() !== filters.status.toLowerCase()) {
          return false;
        }
      }

      // Risk Level
      if (filters.riskLevel !== 'All') {
        if (item.riskLevel?.toLowerCase() !== filters.riskLevel.toLowerCase()) {
          return false;
        }
      }

      // Sentiment
      if (filters.sentiment !== 'All') {
        const itemSentiment = item.sentiment?.toLowerCase() || '';
        if (!itemSentiment.includes(filters.sentiment.toLowerCase())) {
          return false;
        }
      }

      // Rating
      if (filters.rating !== 'All') {
        if (Number(item.rating) !== Number(filters.rating)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (filters.sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (filters.sortBy === 'risk-desc') {
        return (b.fakeProbability || 0) - (a.fakeProbability || 0);
      }
      if (filters.sortBy === 'risk-asc') {
        return (a.fakeProbability || 0) - (b.fakeProbability || 0);
      }
      if (filters.sortBy === 'rating-desc') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [initialData, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const isFiltered = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.status !== 'All' ||
      filters.riskLevel !== 'All' ||
      filters.sentiment !== 'All' ||
      filters.rating !== 'All' ||
      filters.sortBy !== 'date-desc'
    );
  }, [filters]);

  return {
    filters,
    filteredData,
    updateFilter,
    resetFilters,
    isFiltered,
  };
}

