import React from 'react';
import { ArrowRight, Database, Cpu, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Connect & Ingest',
    description: 'Sync your product catalog and stream live customer reviews via Shopify, Amazon, or custom webhooks.',
    icon: Database,
  },
  {
    step: '02',
    title: 'Heuristic AI Analysis',
    description: 'Every review is evaluated across 14 linguistic, syntactical, and IP clustering signals in under 50ms.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Autonomous Protection',
    description: 'Suspicious entries are quarantined in the moderation queue before distorting your star ratings.',
    icon: ShieldCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
          Simple Integration
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
          How ReviewGuard Protects Your Brand
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted mt-2">
          Zero setup friction. Connect your existing product catalog and let automated review intelligence handle the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="p-8 rounded-2xl bg-white border border-brand-border shadow-subtle relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-[#635BFF]/30 font-mono">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#635BFF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

