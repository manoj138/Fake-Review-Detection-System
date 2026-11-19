import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  className = '',
  size = 'md',
  disabled = false,
  ...props
}) {
  const sizeStyles = {
    sm: 'text-xs pl-2.5 pr-8 py-1.5',
    md: 'text-sm pl-3 pr-8 py-2',
  };

  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-xs font-medium text-brand-dark mb-1">{label}</label>}
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed ${sizeStyles[size]}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <ChevronDown className="w-4 h-4 text-brand-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

