import React from 'react';

export function FeatureCard({ feature, className = '' }) {
  if (!feature) return null;
  const Icon = feature.icon;

  return (
    <div
      className={`p-6 rounded-2xl bg-white border border-brand-border shadow-subtle hover:shadow-card hover:border-indigo-200 transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-brand-dark mb-2">
          {feature.title}
        </h3>
        <p className="text-xs text-brand-muted leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;

