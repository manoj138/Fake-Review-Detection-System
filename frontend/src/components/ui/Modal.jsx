import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-2xl',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all my-4 sm:my-8 w-[calc(100vw-1.5rem)] sm:w-full ${maxWidth} border border-brand-border`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-brand-border gap-3">
            <div className="min-w-0 pr-2">
              <h3 className="text-base sm:text-lg font-bold text-brand-dark truncate leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-brand-muted mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                  {subtitle}
                </p>
              )}
            </div>
            <IconButton
              icon={X}
              onClick={onClose}
              title="Close modal"
              size="sm"
              className="flex-shrink-0"
            />
          </div>

          {/* Body with momentum touch scrolling */}
          <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto -webkit-overflow-scrolling-touch">
            {children}
          </div>

          {/* Optional Footer */}
          {footer && (
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-brand-border rounded-b-2xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Modal;
