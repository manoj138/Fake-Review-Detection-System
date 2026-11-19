import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialCard({ item, className = '' }) {
  if (!item) return null;

  return (
    <div
      className={`p-8 rounded-2xl bg-white border border-brand-border shadow-subtle flex flex-col justify-between ${className}`}
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
  );
}

export default TestimonialCard;

