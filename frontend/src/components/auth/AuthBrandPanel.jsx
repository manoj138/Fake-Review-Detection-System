import React from 'react';
import { Shield, Sparkles, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#111827] text-white flex-col justify-between p-12 relative overflow-hidden select-none border-r border-[#1C2638]">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#635BFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Logo */}
      <Link to="/" className="flex items-center gap-3 z-10 w-fit group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-white">
            ReviewGuard
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
            AI Platform
          </span>
        </div>
      </Link>

      {/* Main Center AI Trust Illustration & Messaging */}
      <div className="my-auto py-12 z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C2638] border border-slate-700/60 text-xs font-medium text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Enterprise Review Intelligence</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Trust every review. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            Make smarter decisions.
          </span>
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed mb-8">
          ReviewGuard leverages automated multi-signal neural heuristics to identify synthetic bot surges, paid review syndicates, and competitor smear campaigns before they distort your brand reputation.
        </p>

        {/* Feature Highlights Pills */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1C2638]/70 border border-slate-800 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">94.6% Accuracy Benchmark</p>
              <p className="text-slate-400 text-[11px]">Validated on over 24,000 real-world e-commerce transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1C2638]/70 border border-slate-800 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Continuous Bot Clustering</p>
              <p className="text-slate-400 text-[11px]">Real-time detection of copy-paste templates and velocity bursts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Assurance */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-800 z-10">
        <span>&copy; {new Date().getFullYear()} ReviewGuard Technologies.</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          SOC2 & GDPR Compliant
        </span>
      </div>
    </div>
  );
}

