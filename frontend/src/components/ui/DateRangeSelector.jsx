import React from 'react';

export function DateRangeSelector({
  value = '30d',
  onChange,
  options = ['7d', '30d', '90d'],
  size = 'sm',
  className = '',
}) {
  const sizeStyles = {
    sm: 'px-2.5 sm:px-3 py-1 text-xs',
    md: 'px-3 sm:px-4 py-1.5 text-xs sm:text-sm',
  };

  return (
    <div
      className={`inline-flex p-1 bg-white border border-brand-border rounded-lg shadow-2xs ${className}`}
      role="group"
      aria-label="Select date range"
    >
      {options.map((opt) => {
        const key = typeof opt === 'object' ? opt.value : opt;
        const label = typeof opt === 'object' ? opt.label : opt.toUpperCase();
        const isActive = value === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange && onChange(key)}
            className={`font-semibold rounded-md transition-all duration-150 ${sizeStyles[size]} ${
              isActive
                ? 'bg-[#635BFF] text-white shadow-xs'
                : 'text-brand-muted hover:text-brand-dark hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
export default DateRangeSelector;

