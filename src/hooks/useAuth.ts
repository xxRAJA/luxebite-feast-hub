import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/user';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  });

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('luxebite_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({ user, isLoggedIn: true });
      } catch (error) {
        localStorage.removeItem('luxebite_user');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock login - check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('luxebite_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setAuthState({ user: userWithoutPassword, isLoggedIn: true });
      localStorage.setItem('luxebite_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }): boolean => {
    try {
      const users = JSON.parse(localStorage.getItem('luxebite_users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === userData.email)) {
        return false;
      }

      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date(),
      };

      users.push(newUser);
      localStorage.setItem('luxebite_users', JSON.stringify(users));

      const { password, ...userWithoutPassword } = newUser;
      setAuthState({ user: userWithoutPassword, isLoggedIn: true });
      localStorage.setItem('luxebite_user', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setAuthState({ user: null, isLoggedIn: false });
    localStorage.removeItem('luxebite_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState({ user: updatedUser, isLoggedIn: true });
      localStorage.setItem('luxebite_user', JSON.stringify(updatedUser));
      
      // Update in users array too
      const users = JSON.parse(localStorage.getItem('luxebite_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('luxebite_users', JSON.stringify(users));
      }
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