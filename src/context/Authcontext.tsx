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

     const verifyToken = async () => {
        if (token) {
          const response = await getUser(token);
          if (response == false) {
            console.log("Token inválido ou usuário não encontrado.");
            setIsLoggedIn(false);
            return;

          }
          setIsLoggedIn(true);
        } else {
          console.log("Token não encontrado, usuário não autenticado.");
          setIsLoggedIn(false);
        } 
  
      }
    
    verifyToken()
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
