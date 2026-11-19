import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function AuthFormContainer({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Mobile Branding (visible only on small screens) */}
      <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-brand-dark">ReviewGuard</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">
            AI
          </span>
        </Link>
      </div>

      {/* Form Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Form Body */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-subtle">
        {children}
      </div>
    </div>
  );
}

