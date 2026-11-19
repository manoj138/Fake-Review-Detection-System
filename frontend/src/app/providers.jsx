import React from 'react';
import { ToastProvider } from '../components/ui/Toast';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}
