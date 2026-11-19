import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does ReviewGuard differentiate between genuine enthusiasm and bot spam?',
    a: 'ReviewGuard evaluates reviews across multi-signal vectors including punctuation density, capitalization bursts, lexical variety, and semantic congruence between star rating and phrase polarity.',
  },
  {
    q: 'Can this replace our human moderation team?',
    a: 'ReviewGuard acts as an AI force multiplier. It automatically quarantines high-confidence synthetic spam (>85% probability) while routing uncertain or disputed reviews to human moderators with actionable reasoning.',
  },
  {
    q: 'Does it support multi-language catalog analysis?',
    a: 'Yes, our heuristic tokenizer handles cross-lingual sentiment patterns and unicode text variations.',
  },
  {
    q: 'Can merchants dispute flagged reviews?',
    a: 'Yes, ReviewGuard includes a dedicated Reports & Disputes Center where merchant appeals are investigated with full audit trail transparency.',
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-brand-border bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-brand-dark"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#635BFF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-brand-muted leading-relaxed border-t border-brand-border/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

