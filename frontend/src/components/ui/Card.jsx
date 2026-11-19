import React from 'react';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-brand-border shadow-subtle ${
        hover ? 'transition-all duration-200 hover:shadow-card hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', title, subtitle, action }) {
  if (title || subtitle || action) {
    return (
      <div className={`p-5 pb-3 border-b border-brand-border flex items-start justify-between gap-4 ${className}`}>
        <div>
          {title && <h3 className="text-base font-semibold text-brand-dark">{title}</h3>}
          {subtitle && <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }
  return <div className={`p-5 pb-3 border-b border-brand-border ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 border-t border-brand-border bg-slate-50/50 rounded-b-xl ${className}`}>{children}</div>;
}

