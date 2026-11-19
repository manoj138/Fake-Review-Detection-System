import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const REVIEWS_PROOF = [
  {
    quote: 'ReviewGuard eliminated 82% of fake 5-star bot bursts that were plaguing our flagship audio line within our first week.',
    author: 'Elena Rostova',
    title: 'Head of Quality Assurance, Apex Audio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  {
    quote: 'The duplicate pattern clustering caught an organized smear ring operating across 30 competitor storefronts.',
    author: 'Marcus Vance',
    title: 'VP of Trust & Safety, OmniRetail',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REVIEWS_PROOF.map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-white border border-brand-border shadow-subtle flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-brand-dark italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-brand-border mt-6">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-10 h-10 rounded-full object-cover border border-brand-border"
              />
              <div>
                <p className="text-xs font-bold text-brand-dark">{item.author}</p>
                <p className="text-[11px] text-brand-muted">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

