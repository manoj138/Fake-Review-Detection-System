import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer className="bg-[#111827] text-white border-t border-[#1C2638] pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">ReviewGuard</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8B5CF6]/30 text-[#A78BFA]">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous review intelligence, synthetic detection, and trust preservation for high-volume commerce.
            </p>
          </div>

          {/* Links 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/analyzer" className="hover:text-white transition-colors">
                  AI Review Analyzer
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  Review Explorer
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Product Intelligence
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-white transition-colors">
                  Trust Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Bot Syndicate Protection</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Duplicate Text Clustering</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Competitor Bombing Shield</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Live Heuristic Sandbox</a></li>
            </ul>
          </div>

          {/* Links 3: Account & Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Sign In</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Start Free Trial
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-white transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C2638] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} ReviewGuard Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-white transition-colors">Security Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

