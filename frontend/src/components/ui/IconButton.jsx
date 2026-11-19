import React from 'react';

export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  onClick,
  title,
  ariaLabel,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantStyles = {
    ghost: 'text-brand-muted hover:text-brand-dark hover:bg-slate-100 focus:ring-slate-300',
    secondary: 'bg-white border border-brand-border text-brand-dark hover:bg-slate-50 focus:ring-slate-300 shadow-sm',
    primary: 'bg-[#635BFF] text-white hover:bg-[#5249E0] focus:ring-[#635BFF]',
    danger: 'text-rose-600 hover:bg-rose-50 focus:ring-rose-300',
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel || title}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
}
