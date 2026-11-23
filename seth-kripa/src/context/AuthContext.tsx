import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo credentials — replace with Supabase auth when deploying
const DEMO_EMAIL = 'admin@thadegopal.com';
const DEMO_PASSWORD = 'admin@123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sk_admin_auth') === 'true';
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('sk_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sk_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
