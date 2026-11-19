import React from 'react';
import { TestimonialCard } from './TestimonialCard';

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
          <TestimonialCard key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}

