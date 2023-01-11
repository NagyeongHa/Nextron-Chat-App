import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import MenuSideBar from "./MenuSideBar";

export type Children = { children: ReactNode };

const Layout = ({ children }: Children) => {
  const { pathname } = useRouter();
  const authRoutes = ["/signup", "/login"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <div className='w-full h-screen flex flex-row'>
      <div>{!authRoute && <MenuSideBar />}</div>
      <div className=' w-full'>{children}</div>
    </div>
  );
};

export default Layout;
