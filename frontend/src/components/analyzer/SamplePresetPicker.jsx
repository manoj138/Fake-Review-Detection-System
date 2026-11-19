import React from 'react';
import { Zap } from 'lucide-react';

export function SamplePresetPicker({
  samples = [],
  onSelectSample,
  label = 'Try Example Samples',
  className = '',
}) {
  if (!samples || samples.length === 0) return null;

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => onSelectSample && onSelectSample(sample)}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-[#635BFF] border border-brand-border hover:border-indigo-200 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-brand-muted group-hover:text-[#635BFF] transition-colors" />
            <span>{sample.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SamplePresetPicker;

