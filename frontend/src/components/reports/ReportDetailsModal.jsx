import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import { CopyButton } from '../ui/CopyButton';
import { formatDate } from '../../utils/formatDate';
import { Trash2, Check } from 'lucide-react';

export function ReportDetailsModal({ report, isOpen, onClose, onUpdateStatus }) {
  const [confirmTakedownOpen, setConfirmTakedownOpen] = useState(false);

  if (!report) return null;

  const handleConfirmTakedown = () => {
    setConfirmTakedownOpen(false);
    onUpdateStatus && onUpdateStatus(report.id, 'Resolved');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Moderation Case: ${report.id}`}
        subtitle={
          <span className="inline-flex items-center gap-2 flex-wrap">
            <span>Submitted on {formatDate(report.date)} • Reporter: {report.reporter}</span>
            <CopyButton textToCopy={report.id} label="Copy Case ID" size="xs" />
          </span>
        }
        maxWidth="max-w-xl"
        footer={
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setConfirmTakedownOpen(true)}
              className="w-full sm:w-auto"
            >
              Takedown Review
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUpdateStatus && onUpdateStatus(report.id, 'Reviewed')}
                className="flex-1 sm:flex-initial"
              >
                Mark Under Review
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Check}
                onClick={() => onUpdateStatus && onUpdateStatus(report.id, 'Resolved')}
                className="flex-1 sm:flex-initial"
              >
                Mark Resolved
              </Button>
            </div>
          </div>
        }
      >
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-brand-border space-y-1">
          <span className="text-[10px] uppercase font-semibold text-brand-muted">
            Product Target
          </span>
          <p className="font-semibold text-brand-dark text-sm">
            {report.product}
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-brand-muted block mb-1">
            Reported Review Content
          </span>
          <div className="p-3 rounded-lg border border-brand-border bg-white italic font-normal text-brand-dark leading-relaxed">
            "{report.snippet}"
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Violation Category
            </span>
            <span className="font-semibold text-brand-dark mt-0.5 block">
              {report.reason}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-brand-border">
            <span className="text-[10px] uppercase font-semibold text-brand-muted block">
              Risk Assessment
            </span>
            <span className="font-bold text-rose-600 mt-0.5 block">
              {report.riskScore}% Probability ({report.severity})
            </span>
          </div>
        </div>

        {report.notes && (
          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-amber-900 leading-relaxed">
            <span className="font-semibold block mb-0.5">Automated Investigator Notes:</span>
            <p>{report.notes}</p>
          </div>
        )}
      </div>
    </Modal>

    {/* Confirmation Dialog for Takedown */}
    <ConfirmationDialog
      isOpen={confirmTakedownOpen}
      onClose={() => setConfirmTakedownOpen(false)}
      onConfirm={handleConfirmTakedown}
      title="Confirm Review Takedown"
      message={`Are you sure you want to permanently quarantine and take down review from "${report.product}"? This will notify the merchant and log an automated dispute record.`}
      confirmLabel="Yes, Takedown Review"
      variant="danger"
    />
  </>
  );
}
export default ReportDetailsModal;

