import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  loyaltyPoints?: number;
}

interface AuthContextType {
  user: User | null;
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
  login: (email: string, name?: string, phone?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const item = window.localStorage.getItem('zivara_user');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading user from local storage', error);
      return null;
    }
  });
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const login = (email: string, name: string = 'Guest User', phone: string = '') => {
    // Mock login with some initial loyalty points
    const newUser = { name, email, phone, loyaltyPoints: 250 };
    setUser(newUser);
    window.localStorage.setItem('zivara_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('zivara_user');
    setIsProfileOpen(false);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      window.localStorage.setItem('zivara_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isProfileOpen,
        setIsProfileOpen,
        login,
        logout,
        updateProfile
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
