import React from 'react';

export function AuthDivider({ text = 'Or continue with email' }) {
  return (
    <div className="relative my-5 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-brand-border" />
      </div>
      <div className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-brand-muted font-medium">
        {text}
      </div>
    </div>
  );
}

