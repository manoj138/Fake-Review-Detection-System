import React from 'react';
import { AuthBrandPanel } from './AuthBrandPanel';

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex bg-[#F5F7FB] font-sans antialiased">
      {/* Left Deep Navy Branding Panel (hidden on mobile, 50% on lg) */}
      <AuthBrandPanel />

      {/* Right Authentication Workspace */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 overflow-y-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}

