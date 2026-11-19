import React from 'react';
import { AlertCircle, CheckCircle2, Shield, TrendingDown, Target, Zap } from 'lucide-react';

export function ProblemSolution() {
  return (
    <section className="py-20 bg-slate-50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
            The Crisis & The Antidote
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
            Why Manual Moderation Fails
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Modern review fraud is no longer just obvious spam. Organized review rings and automated generative bots fool traditional static keyword filters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Problem Card */}
          <div className="p-8 rounded-2xl bg-white border border-rose-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">
              The $152B Review Manipulation Problem
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mb-6 leading-relaxed">
              Ecommerce brands lose millions in return rates, advertising waste, and eroded customer trust due to deceptive reviews:
            </p>
            <ul className="space-y-3 text-xs text-brand-dark">
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span><strong>Coordinated Bot Injections:</strong> Sudden bursts of 5-star generic reviews elevating undeserving merchant listings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span><strong>Competitor Smear Bombing:</strong> Orchestrated 1-star attacks promoting rival brands directly inside customer complaints.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span><strong>Reviewer Fatigue:</strong> Human moderation teams cannot process thousands of reviews with consistent vigilance.</span>
              </li>
            </ul>
          </div>

          {/* The ReviewGuard Solution Card */}
          <div className="p-8 rounded-2xl bg-white border border-indigo-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#635BFF] flex items-center justify-center mb-5">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">
              The ReviewGuard Intelligence Shield
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mb-6 leading-relaxed">
              An enterprise defense layer combining algorithmic pattern recognition with linguistic analysis:
            </p>
            <ul className="space-y-3 text-xs text-brand-dark">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Multi-Signal NLP Heuristics:</strong> Dissects punctuation bursts, sentiment polarity mismatch, and lexical repetition.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Velocity & Subnet Clustering:</strong> Detects synchronized posting frequencies and identical syntax across stores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Automated Quarantine:</strong> High-risk reviews are automatically held before impacting your star rating.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

