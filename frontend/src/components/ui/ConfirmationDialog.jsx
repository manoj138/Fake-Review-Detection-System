import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Info } from 'lucide-react';

export function ConfirmationDialog({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onClose,
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
      footer={
        <div className="flex items-center justify-end gap-2.5 w-full">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            loading={loading}
            onClick={() => {
              onConfirm && onConfirm();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-3.5 py-1">
        <div
          className={`p-2.5 rounded-full flex-shrink-0 ${
            variant === 'danger'
              ? 'bg-rose-50 text-rose-600 border border-rose-100'
              : 'bg-indigo-50 text-[#635BFF] border border-indigo-100'
          }`}
        >
          {variant === 'danger' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>
        <div className="text-xs text-brand-muted leading-relaxed pt-0.5">
          {message}
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;

