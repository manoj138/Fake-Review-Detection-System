import React from 'react';

export function ThresholdSlider({
  label,
  value,
  min = 50,
  max = 95,
  step = 5,
  unit = '%',
  onChange,
  description,
  className = '',
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {label && (
            <span className="text-xs font-semibold text-brand-dark block">
              {label}: {value}{unit}
            </span>
          )}
          {description && (
            <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <span className="text-xs font-bold text-[#635BFF] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 flex-shrink-0">
          {value}{unit}
        </span>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          className="w-full accent-[#635BFF] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none focus:outline-none"
        />
        <div className="flex items-center justify-between text-[10px] text-brand-muted mt-1 font-mono">
          <span>{min}{unit} (Permissive)</span>
          <span>{Math.round((min + max) / 2)}{unit} (Balanced)</span>
          <span>{max}{unit} (Strict)</span>
        </div>
      </div>
    </div>
  );
}

export default ThresholdSlider;

