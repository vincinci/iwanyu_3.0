'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  isVendor: boolean;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if we're in test mode (no Supabase config)
const isTestMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Test mode: create mock user data
  const [testUser, setTestUser] = useState(() => {
    if (isTestMode) {
      const saved = localStorage.getItem('test-user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    if (isTestMode) {
      // Test mode: use localStorage for persistence
      setUser(testUser);
      setUserRole(testUser?.user_metadata?.role || 'CUSTOMER');
      setLoading(false);
      return;
    }

    // Real Supabase mode
    const supabase = createClient();

    // Get initial session
    const getUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        
        if (currentUser) {
          // Get user role from database
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('email', currentUser.email)
            .single();
          
          setUserRole(userData?.role || 'CUSTOMER');
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Get user role from database
          try {
            const { data: userData } = await supabase
              .from('users')
              .select('role')
              .eq('email', session.user.email)
              .single();
            
            setUserRole(userData?.role || 'CUSTOMER');
          } catch (error) {
            console.error('Error getting user role:', error);
            setUserRole('CUSTOMER');
          }
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [testUser]);

  const signOut = async () => {
    if (isTestMode) {
      setTestUser(null);
      setUser(null);
      setUserRole(null);
      localStorage.removeItem('test-user');
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
  };

  const isVendor = userRole === 'VENDOR';
  const isAdmin = userRole === 'ADMIN';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userRole, 
        isVendor, 
        isAdmin, 
        loading, 
        signOut 
      }}
    >
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
