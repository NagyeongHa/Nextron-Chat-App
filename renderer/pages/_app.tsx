import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Layout from "../components/common/Layout";
import { AuthProvider } from "../context/Auth";
import AuthedRoute from "../context/AuthedRoute";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/signup", "/login"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <>
      <AuthProvider>
        {authRoute ? (
          <Component {...pageProps} />
        ) : (
          <AuthedRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthedRoute>
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;
