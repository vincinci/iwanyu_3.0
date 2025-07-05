'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  isVendor: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check
    const mockUser = localStorage.getItem('iwanyu_user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock sign in - in a real app, this would call your backend API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'customer'
      };
      setUser(mockUser);
      localStorage.setItem('iwanyu_user', JSON.stringify(mockUser));
      console.log('Mock login with:', email, password);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw new Error('Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock sign up - in a real app, this would call your backend API
      const mockUser: User = {
        id: '2',
        email,
        name,
        role: 'customer'
      };
      setUser(mockUser);
      localStorage.setItem('iwanyu_user', JSON.stringify(mockUser));
      console.log('Mock signup with:', email, password, name);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw new Error('Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('iwanyu_user');
  };

  const isVendor = user?.role === 'vendor';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading, isVendor, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
