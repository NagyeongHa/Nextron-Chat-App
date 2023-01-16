import React from "react";
import { Children } from "../../types/Children";
import MenuSideBar from "./MenuSideBar";

const Layout = ({ children }: Children) => {
  return (
    <div className='w-full h-screen overflow-y-hidden flex flex-row flex-nowrap bg-white'>
      <MenuSideBar />
      <div className=' w-full h-full bg-white overflow-y-scroll'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
