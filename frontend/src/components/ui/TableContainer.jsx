import React from 'react';

export function TableContainer({
  children,
  minWidth = 'min-w-[640px]',
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-brand-border shadow-subtle overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <div className={minWidth}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TableContainer;

