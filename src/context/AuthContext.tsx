import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { database } from '../utils/database';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<boolean>;
  register: (email: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('current_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string): Promise<boolean> => {
    try {
      const user = await database.getUserByEmail(email);
      if (user) {
        localStorage.setItem('current_user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, isAdmin: boolean = false): Promise<boolean> => {
    try {
      const existingUser = await database.getUserByEmail(email);
      if (existingUser) {
        return false; // User already exists
      }

      const newUser = await database.createUser(email, isAdmin);
      localStorage.setItem('current_user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('current_user', JSON.stringify(user));
    setAuthState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};