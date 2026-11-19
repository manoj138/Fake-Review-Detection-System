import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
  className = '',
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4 border-t border-brand-border bg-white text-xs text-brand-muted ${className}`}>
      {/* Items count summary */}
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="font-semibold text-brand-dark">{startItem}</strong> to{' '}
          <strong className="font-semibold text-brand-dark">{endItem}</strong> of{' '}
          <strong className="font-semibold text-brand-dark">{totalItems}</strong> entries
        </span>

        {onRowsPerPageChange && (
          <div className="flex items-center gap-1.5 ml-3">
            <span>Rows:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="bg-white border border-brand-border rounded px-1.5 py-0.5 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </div>
        )}
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-md border border-brand-border text-brand-dark hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-2 font-medium text-brand-dark">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-md border border-brand-border text-brand-dark hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
