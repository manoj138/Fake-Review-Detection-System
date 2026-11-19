import React from 'react';

export function Badge({
  children,
  variant = 'secondary',
  size = 'md',
  dot = false,
  className = '',
  icon: Icon,
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-red-100 text-red-800 border-red-300 font-semibold',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    ai: 'bg-violet-50 text-violet-700 border-violet-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const dotColors = {
    primary: 'bg-indigo-500',
    success: 'bg-emerald-500',
    danger: 'bg-rose-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-600',
    secondary: 'bg-slate-400',
    ai: 'bg-violet-500',
    info: 'bg-blue-500',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-current'}`} />}
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

