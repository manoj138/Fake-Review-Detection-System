import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ReviewAnalyzer from '../pages/analyzer/ReviewAnalyzer';
import ReviewExplorer from '../pages/reviews/ReviewExplorer';
import Products from '../pages/products/Products';
import TrustAnalytics from '../pages/analytics/TrustAnalytics';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'analyzer',
        element: <ReviewAnalyzer />,
      },
      {
        path: 'reviews',
        element: <ReviewExplorer />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'analytics',
        element: <TrustAnalytics />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

