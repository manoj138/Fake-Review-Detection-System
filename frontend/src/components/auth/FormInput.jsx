import React from 'react';
import { AlertCircle } from 'lucide-react';

export function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-brand-dark">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-xl text-brand-dark placeholder-brand-muted/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-50 disabled:cursor-not-allowed ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-brand-border focus:border-[#635BFF] focus:ring-[#635BFF]/20'
          }`}
          {...props}
        />
        {error && (
          <AlertCircle className="w-4 h-4 text-rose-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

