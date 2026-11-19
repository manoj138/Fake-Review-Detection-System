import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          let bg = 'bg-white border-brand-border text-brand-dark';
          let icon = <Info className="w-5 h-5 text-brand-primary flex-shrink-0" />;

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
            bg = 'bg-white border-emerald-200 text-brand-dark';
          } else if (toast.type === 'danger' || toast.type === 'error') {
            icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
            bg = 'bg-white border-rose-200 text-brand-dark';
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
            bg = 'bg-white border-amber-200 text-brand-dark';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg transition-all duration-200 animate-slide-up ${bg}`}
            >
              <div className="flex items-center space-x-3 text-sm font-medium">
                {icon}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 text-brand-muted hover:text-brand-dark transition-colors p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
