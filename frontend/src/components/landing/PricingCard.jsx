import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function PricingCard({ plan, className = '' }) {
  if (!plan) return null;

  return (
    <div
      className={`p-8 rounded-2xl bg-white border flex flex-col justify-between relative transition-all ${
        plan.popular
          ? 'border-[#635BFF] shadow-card ring-2 ring-[#635BFF]/10'
          : 'border-brand-border shadow-subtle'
      } ${className}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#635BFF] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
          Most Popular Choice
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-brand-dark">{plan.name}</h3>
        <p className="text-xs text-brand-muted mt-1 leading-relaxed">{plan.description}</p>

        <div className="my-6">
          <span className="text-4xl font-extrabold text-brand-dark">
            {plan.price}
          </span>
          <span className="text-xs text-brand-muted ml-2">{plan.period}</span>
        </div>

        <ul className="space-y-3 text-xs text-brand-dark border-t border-brand-border pt-6 mb-8">
          {plan.features.map((feat, fIdx) => (
            <li key={fIdx} className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/register" className="w-full block">
        <Button
          variant={plan.variant || 'primary'}
          size="md"
          className="w-full font-semibold"
        >
          {plan.cta}
        </Button>
      </Link>
    </div>
  );
}

export default PricingCard;

