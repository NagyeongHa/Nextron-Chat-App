import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../types/AuthContext";
import { Children } from "../types/Children";
import { UserInfo } from "../types/UserInfo";

const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  login: undefined,
  logout: undefined,
  signUp: undefined,
});

export const AuthProvider = ({ children }: Children) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo>(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, userData => {
      try {
        if (userData) {
          setUser(userData);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => listener();
  }, [auth]);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
