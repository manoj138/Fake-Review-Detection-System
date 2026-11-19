import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Public Landing Page
import LandingPage from '../pages/landing/LandingPage';

// Public Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Protected Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import ReviewAnalyzer from '../pages/analyzer/ReviewAnalyzer';
import ReviewExplorer from '../pages/reviews/ReviewExplorer';
import Products from '../pages/products/Products';
import TrustAnalytics from '../pages/analytics/TrustAnalytics';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';

export const router = createBrowserRouter([
  // Public Landing Page
  {
    path: '/',
    element: <LandingPage />,
  },

  // Public Authentication Pages (outside of dashboard AppLayout)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },

  // Protected Dashboard Layout and Routes
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/analyzer',
        element: <ReviewAnalyzer />,
      },
      {
        path: '/reviews',
        element: <ReviewExplorer />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/analytics',
        element: <TrustAnalytics />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },

  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
