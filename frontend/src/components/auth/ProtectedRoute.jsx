import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated user to /login with attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

