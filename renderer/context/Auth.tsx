import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { Children } from "../types/Children";
import { UserInfo } from "../types/UserInfo";

interface AuthContext {
  user: UserInfo;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
}
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
    const listener = onAuthStateChanged(auth, user => {
      try {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
          });
          return setIsLoading(false);
        }
        return setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    });

    return () => listener();
  }, [auth]);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    return await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
