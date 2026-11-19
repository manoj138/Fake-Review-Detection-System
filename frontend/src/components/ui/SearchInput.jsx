import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  size = 'md',
  ...props
}) {
  const sizeStyles = {
    sm: 'text-xs pl-8 pr-7 py-1.5',
    md: 'text-sm pl-9 pr-8 py-2',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className={`absolute text-brand-muted pointer-events-none ${iconSizes[size]}`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border border-brand-border rounded-lg text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all ${sizeStyles[size]}`}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="absolute right-2.5 text-brand-muted hover:text-brand-dark transition-colors p-0.5 rounded"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

