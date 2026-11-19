import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Subtle ambient blur circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-blue-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-[#8B5CF6] mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Review Intelligence & Bot Containment</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark leading-[1.15] mb-6">
          Detect Fake Reviews. <br />
          <span className="bg-gradient-to-r from-[#635BFF] via-[#8B5CF6] to-indigo-600 bg-clip-text text-transparent">
            Safeguard Brand Trust.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed mb-8 max-w-2xl mx-auto">
          ReviewGuard empowers e-commerce leaders, trust & safety teams, and product managers to automatically uncover synthetic bot surges, duplicate clusters, and paid review sabotage in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="shadow-md">
              Start Free Trial
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="secondary" size="lg">
              Test Live Analyzer
            </Button>
          </a>
        </div>

        {/* Micro Social Proof */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-brand-muted">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Instant heuristic audit
          </span>
          <span className="flex items-center gap-1.5 hidden sm:inline-flex">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            94.6% Accuracy benchmark
          </span>
        </div>
      </div>

      {/* Floating Hero Preview Card */}
      <div className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl border border-brand-border shadow-card p-4 sm:p-6 backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 font-mono text-brand-muted">reviewguard-neural-auditor v1.0</span>
          </div>
          <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Live Simulated Inference
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-brand-border">
            <span className="text-brand-muted font-semibold uppercase text-[10px]">Sample Customer Review</span>
            <p className="italic font-normal text-brand-dark mt-2 leading-relaxed">
              "BEST PRODUCT EVER!! BUY NOW BUY NOW!! AMAZING QUALITY WOW WOW WOW!!"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
            <div>
              <span className="text-rose-700 font-bold uppercase text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High Risk Detected
              </span>
              <p className="text-xl font-bold text-rose-600 mt-1">92% Fake Probability</p>
            </div>
            <p className="text-[11px] text-rose-800 mt-2">
              Triggered: All-Caps Shouting, Tripled Punctuation, Bot Phrase Duplication.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200 flex flex-col justify-between">
            <div>
              <span className="text-violet-700 font-bold uppercase text-[10px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Automated Action
              </span>
              <p className="text-sm font-bold text-violet-950 mt-1">Quarantined for Moderation</p>
            </div>
            <Link to="/login" className="text-xs text-[#635BFF] font-semibold hover:underline mt-2 inline-flex items-center gap-1">
              <span>View full case details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

