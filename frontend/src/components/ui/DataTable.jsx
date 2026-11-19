import React from 'react';
import { EmptyState } from './EmptyState';

export function DataTable({
  columns = [],
  data = [],
  renderRow,
  keyExtractor = (item, index) => item.id || index,
  emptyTitle = 'No data available',
  emptyDescription = 'No records match your current criteria.',
  className = '',
}) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-brand-border bg-white shadow-subtle ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-brand-border bg-slate-50/75 text-brand-muted uppercase font-semibold tracking-wider">
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`py-3 px-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border text-brand-dark">
          {data.map((item, index) => {
            if (renderRow) {
              return renderRow(item, index);
            }
            return (
              <tr key={keyExtractor(item, index)} className="hover:bg-slate-50/60 transition-colors">
                {columns.map((col, cIdx) => (
                  <td
                    key={col.key || cIdx}
                    className={`py-3.5 px-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                  >
                    {col.render ? col.render(item, index) : item[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

