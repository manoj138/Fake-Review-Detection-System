import React from 'react';
import { Card } from '../ui/Card';
import { RiskDistributionChart } from '../charts/RiskDistributionChart';
import { RISK_DISTRIBUTION } from '../../data/dashboardData';

export function RiskDistribution({ className = '' }) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-semibold text-brand-dark">Risk Distribution</h4>
          <p className="text-xs text-brand-muted mt-0.5">Categorization across 24,856 verified items</p>
        </div>
        <span className="text-xs font-semibold text-[#EF6464] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          17.0% Total High/Critical
        </span>
      </div>

      <RiskDistributionChart data={RISK_DISTRIBUTION} />
    </Card>
  );
}

