import React from 'react';

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) {
  return (
    <label className={`inline-flex items-start gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-10 h-5.5 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-[#635BFF]' : 'bg-slate-300'
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full shadow-sm transition-transform duration-200 ease-in-out transform ${
            checked ? 'translate-x-4.5' : 'translate-x-0'
          }`}
        />
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-brand-dark">{label}</span>}
          {description && <span className="text-xs text-brand-muted mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  );
}

