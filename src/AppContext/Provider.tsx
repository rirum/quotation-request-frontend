import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const login = (username: string, password: string) => {
    const authenticatedUser = {
      id: 1,
      email: 'example@example.com',
      name: 'John Doe',
    };
    const authToken = 'your_generated_token';

    setUser(authenticatedUser);
    setToken(authToken);

    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue: AuthContextProps = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
