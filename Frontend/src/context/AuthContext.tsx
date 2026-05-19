import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decoded: any = jwtDecode(newToken);
    setUser({
      id: decoded.id,
      email: decoded.email,
      name: '', // We might need to fetch this or include it in the token
      role: 'user',
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        // Check if expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(storedToken);
          setUser({
            id: decoded.id,
            email: decoded.email,
            name: '', 
            role: 'user',
          });
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
