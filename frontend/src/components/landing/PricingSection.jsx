import React from 'react';
import { PricingCard } from './PricingCard';

const PLANS = [
  {
    name: 'Starter Trial',
    price: '$0',
    period: 'for 14 days',
    description: 'Perfect for small retailers exploring AI fraud containment.',
    features: [
      'Up to 1,000 reviews analyzed/mo',
      'Basic heuristic pattern rules',
      'Single user seat',
      'Email alerts on bot bursts',
      'Community support',
    ],
    cta: 'Start Free Trial',
    variant: 'secondary',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: 'per month',
    description: 'Designed for scaling e-commerce brands & merchants.',
    features: [
      'Up to 25,000 reviews analyzed/mo',
      'Advanced duplicate syndication detection',
      'Full Review Explorer & Analytics',
      'Automated quarantine workflows',
      'Up to 5 team seats',
      'Priority ticket response',
    ],
    cta: 'Get Started with Pro',
    variant: 'primary',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual billing',
    description: 'Custom AI models and SLA guarantees for marketplaces.',
    features: [
      'Unlimited monthly reviews',
      'Custom IP subnet clustering',
      'Dedicated compliance officer support',
      'SOC2 audit export trails',
      'Unlimited team seats & SSO',
      'Custom webhook integrations',
    ],
    cta: 'Contact Enterprise',
    variant: 'outline',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-slate-50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
            Predictable Plans for Any Catalog Size
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Transparent pricing with zero hidden fees. Upgrade or pause anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

