import React from 'react';

export function ProgressBar({
  value = 0,
  max = 100,
  color,
  variant = 'auto',
  height = 'md',
  label,
  valueLabel,
  showLabel = false,
  className = '',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heightStyles = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const getVariantBg = () => {
    if (color) return '';
    if (variant === 'success' || (variant === 'auto' && percentage < 30)) return 'bg-emerald-500';
    if (variant === 'warning' || (variant === 'auto' && percentage < 70)) return 'bg-amber-500';
    if (variant === 'danger' || (variant === 'auto' && percentage >= 70)) return 'bg-rose-500';
    if (variant === 'primary') return 'bg-[#635BFF]';
    if (variant === 'ai') return 'bg-[#8B5CF6]';
    return 'bg-emerald-500';
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (label || valueLabel) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-brand-dark">{label}</span>}
          <span className="font-semibold text-brand-dark">
            {valueLabel || `${percentage}%`}
          </span>
        </div>
      )}

      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getVariantBg()}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: color || undefined,
          }}
        />
      </div>
    </div>
  );
}
export default ProgressBar;

