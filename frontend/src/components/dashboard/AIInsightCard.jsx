import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { AI_INSIGHTS } from '../../data/dashboardData';
import { Link } from 'react-router-dom';

export function AIInsightCard({ className = '' }) {
  return (
    <Card className={`p-5 bg-gradient-to-br from-violet-50/40 via-white to-indigo-50/20 border-violet-100 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-violet-100/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-100 text-[#8B5CF6]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-brand-dark">AI Intelligence</h4>
            <span className="text-[11px] text-brand-muted">Automated behavioral pattern detection</span>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
          Live Analysis
        </span>
      </div>

      <div className="space-y-3">
        {AI_INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="p-3 bg-white/90 rounded-lg border border-violet-100/70 shadow-2xs text-xs flex items-start gap-3 hover:border-violet-200 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-brand-dark">{insight.category}</span>
                <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100">
                  {insight.tag}
                </span>
              </div>
              <p className="text-brand-muted leading-relaxed">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-violet-100/80 flex items-center justify-between text-xs">
        <span className="text-brand-muted flex items-center gap-1.5 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Heuristics updated 10m ago
        </span>
        <Link
          to="/analyzer"
          className="inline-flex items-center gap-1 text-[#635BFF] font-medium hover:underline text-xs"
        >
          <span>Run Custom Audit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}

