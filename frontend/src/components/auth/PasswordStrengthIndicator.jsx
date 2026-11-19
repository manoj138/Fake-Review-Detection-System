import React, { useMemo } from 'react';

export function PasswordStrengthIndicator({ password = '' }) {
  const { score, label, colorClass, barColor } = useMemo(() => {
    if (!password) {
      return { score: 0, label: '', colorClass: '', barColor: 'bg-slate-200' };
    }

    let points = 0;
    if (password.length >= 8) points += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points += 1;
    if (/\d/.test(password)) points += 1;
    if (/[^A-Za-z0-9]/.test(password)) points += 1;

    switch (points) {
      case 1:
        return {
          score: 1,
          label: 'Weak',
          colorClass: 'text-rose-600',
          barColor: 'bg-rose-500',
        };
      case 2:
        return {
          score: 2,
          label: 'Fair',
          colorClass: 'text-amber-600',
          barColor: 'bg-amber-500',
        };
      case 3:
        return {
          score: 3,
          label: 'Good',
          colorClass: 'text-indigo-600',
          barColor: 'bg-[#635BFF]',
        };
      case 4:
        return {
          score: 4,
          label: 'Strong',
          colorClass: 'text-emerald-600',
          barColor: 'bg-emerald-500',
        };
      default:
        return {
          score: 1,
          label: 'Too short',
          colorClass: 'text-rose-500',
          barColor: 'bg-rose-400',
        };
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-brand-muted">Password strength:</span>
        <span className={`font-semibold ${colorClass}`}>{label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full rounded-full transition-all duration-300 ${
              score >= step ? barColor : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

