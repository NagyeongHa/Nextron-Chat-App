import { UserCredential } from "firebase/auth";
import { UserInfo } from "./UserInfo";

export interface AuthContext {
  user: UserInfo | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
}
