import React, { ReactNode } from "react";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";
import MenuSideBar from "./MenuSideBar";

export type Children = { children: ReactNode };

const Layout = ({ children }: Children) => {
  const onAuth = useOnAuthStateChange();
  const { isLoggedin, userInfo } = onAuth;
  const { name, profileImage } = userInfo;

  return (
    <div className='w-full h-screen flex flex-row'>
      <div>
        {isLoggedin && <MenuSideBar name={name} profileImage={profileImage} />}
      </div>
      <div className='p-3'>{children}</div>
    </div>
  );
};

export default Layout;
