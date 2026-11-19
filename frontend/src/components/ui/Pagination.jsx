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
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-3 sm:px-4 border-t border-brand-border bg-white text-xs text-brand-muted ${className}`}>
      {/* Items count summary & rows select */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto text-center sm:text-left">
        <span>
          Showing <strong className="font-semibold text-brand-dark">{startItem}</strong>–
          <strong className="font-semibold text-brand-dark">{endItem}</strong> of{' '}
          <strong className="font-semibold text-brand-dark">{totalItems}</strong>
        </span>

        {onRowsPerPageChange && (
          <div className="flex items-center gap-1.5 ml-2">
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

      {/* Page controls with comfortable tap targets */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-md border border-brand-border text-brand-dark hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-2 font-medium text-brand-dark text-xs whitespace-nowrap">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-md border border-brand-border text-brand-dark hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
