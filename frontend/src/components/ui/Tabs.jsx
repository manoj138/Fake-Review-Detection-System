import React from 'react';

export function Tabs({ tabs = [], activeTab, onChange, variant = 'line', className = '' }) {
  if (variant === 'pills') {
    return (
      <div className={`inline-flex p-1 bg-slate-100 rounded-xl space-x-1 border border-brand-border ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-white text-brand-dark shadow-xs font-semibold'
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`border-b border-brand-border flex space-x-6 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${
              isActive
                ? 'text-[#635BFF] font-semibold'
                : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF] rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

