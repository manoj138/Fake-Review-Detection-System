import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'reviewguard_session_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = (email, password, rememberMe = true) => {
    // Simulated credential verification
    const mockUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Demo User',
      email: email.trim().toLowerCase(),
      role: 'Trust & Safety Analyst',
      avatar: 'VG',
      sessionStarted: new Date().toISOString(),
    };

    setUser(mockUser);
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    }
    return mockUser;
  };

  const register = (name, email, password) => {
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'Review Intelligence Officer',
      avatar: name.trim().split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2) || 'RG',
      sessionStarted: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

