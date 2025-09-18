import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/user';
import { supabase } from '../integrations/supabase/client';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  });

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthState({ 
          user: {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email || '',
            email: session.user.email || '',
            phone: session.user.user_metadata?.phone || '',
            address: session.user.user_metadata?.address || '',
            createdAt: new Date(session.user.created_at)
          }, 
          isLoggedIn: true 
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuthState({ 
            user: {
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email || '',
              email: session.user.email || '',
              phone: session.user.user_metadata?.phone || '',
              address: session.user.user_metadata?.address || '',
              createdAt: new Date(session.user.created_at)
            }, 
            isLoggedIn: true 
          });
        } else {
          setAuthState({ user: null, isLoggedIn: false });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return !error;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
          },
        },
      });
      return !error;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthState({ user: null, isLoggedIn: false });
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates,
      });
      
      if (!error && authState.user) {
        const updatedUser = { ...authState.user, ...updates };
        setAuthState({ user: updatedUser, isLoggedIn: true });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser
  };
};