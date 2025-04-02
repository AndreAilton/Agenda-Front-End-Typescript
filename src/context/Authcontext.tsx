import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/authService";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    try {
      if (token) {
        getUser(token)
          .then((data) => {
            if (data) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar usuário:", error);
            setIsLoggedIn(false);
          });
      }
    }
    catch (error) {
      console.error("Erro ao verificar token:", error);
      setIsLoggedIn(false);
    }
    
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload()
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
