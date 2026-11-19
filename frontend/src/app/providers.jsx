import React from 'react';
import { ToastProvider } from '../components/ui/Toast';

export function Providers({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}

