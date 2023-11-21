import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
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

  const login = (authToken: string) => {
    // Simule a obtenção dos dados do usuário a partir do token (pode variar dependendo da sua lógica)
    const decodedToken = decodeToken(authToken);
    const authenticatedUser = {
      id: decodedToken.id,
      email: decodedToken.email,
      name: decodedToken.name,
    };

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

// Função para decodificar o token (dependendo da sua biblioteca JWT)
const decodeToken = (token: string) => {
  // Lógica para decodificar o token (usando a biblioteca jwt-decode neste exemplo)
  // Certifique-se de ter a biblioteca instalada (npm install jwt-decode)
  const decoded = require('jwt-decode');
  return decoded(token);
};
