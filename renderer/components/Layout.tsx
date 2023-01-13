import { useRouter } from "next/router";
import React from "react";
import { Children } from "../types/Children";
import MenuSideBar from "./MenuSideBar";

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
