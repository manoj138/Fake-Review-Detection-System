import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatDate';
import { Eye } from 'lucide-react';

export function ReportTableRow({ report, onReview, className = '' }) {
  if (!report) return null;

  return (
    <tr
      onClick={() => onReview && onReview(report)}
      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${className}`}
    >
      <td className="py-3.5 px-4 font-mono font-semibold text-brand-dark whitespace-nowrap text-xs">
        {report.id}
      </td>

      <td className="py-3.5 px-4 max-w-xs">
        <p className="font-normal text-brand-dark line-clamp-1 italic text-xs">
          "{report.snippet}"
        </p>
        <span className="text-[10px] text-brand-muted">
          via {report.reporter}
        </span>
      </td>

      <td className="py-3.5 px-4 font-semibold text-brand-dark max-w-[160px] truncate text-xs">
        {report.product}
      </td>

      <td className="py-3.5 px-4 max-w-[180px]">
        <span className="font-medium text-brand-dark truncate block text-xs">
          {report.reason}
        </span>
      </td>

      <td className="py-3.5 px-4 text-brand-muted whitespace-nowrap text-xs">
        {formatDate(report.date)}
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap">
        <StatusBadge status={report.status} size="sm" />
      </td>

      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={(e) => {
            e.stopPropagation();
            onReview && onReview(report);
          }}
        >
          Review
        </Button>
      </td>
    </tr>
  );
}
export default ReportTableRow;

