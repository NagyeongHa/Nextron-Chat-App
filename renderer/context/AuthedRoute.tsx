import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Children } from "../types/Children";
import { useAuth } from "./Auth";

const AuthedRoute = ({ children }: Children) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return <>{user ? children : null}</>;
};

export default AuthedRoute;
