import React from 'react';
import { Link } from 'react-router-dom';

export function AuthFooter() {
  return (
    <div className="mt-6 text-center text-xs text-brand-muted">
      <span>By continuing, you agree to ReviewGuard's </span>
      <a href="#terms" className="text-[#635BFF] hover:underline font-medium">
        Terms of Service
      </a>
      <span> and </span>
      <a href="#privacy" className="text-[#635BFF] hover:underline font-medium">
        Privacy Policy
      </a>
      .
    </div>
  );
}

