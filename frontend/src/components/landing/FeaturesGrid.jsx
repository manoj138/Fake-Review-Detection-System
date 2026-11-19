import React from 'react';
import { FeatureCard } from './FeatureCard';
import {
  Sparkles,
  Layers,
  BarChart3,
  SearchCheck,
  ShieldCheck,
  Clock,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Multi-Signal Heuristic AI',
    description: 'Calculates caps ratios, promotional trigger phrases, and syntactic repetition using client-grade linguistic rules.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Layers,
    title: 'Duplicate Pattern Clustering',
    description: 'Catches syndication networks posting slightly varied or 100% duplicate copy across separate catalog categories.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Zap,
    title: 'Sentiment Inversion Detection',
    description: 'Identifies bot errors where 5-star ratings accompany overwhelmingly negative text or vice versa.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: SearchCheck,
    title: 'Multidimensional Explorer',
    description: 'Filter reviews across risk levels, verified purchase flags, and product categories with zero latency.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: BarChart3,
    title: 'Product Intelligence Trajectory',
    description: 'Monitor individual SKU authenticity trajectories over 7, 30, and 90-day intervals with Recharts analytics.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'Dispute & Moderation Workflow',
    description: 'Resolve merchant appeals and dispute flagged claims with comprehensive audit trails and dispute records.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
          Core Capabilities
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
          Engineered for Enterprise Trust & Safety
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted mt-2">
          Everything your trust officers and fraud analysts need to preserve marketplace integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
}

