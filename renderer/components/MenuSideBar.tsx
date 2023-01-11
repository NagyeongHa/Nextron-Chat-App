import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "../firebase";

interface SideBarProp {
  name: string;
  profileImage: string;
}
const MenuSideBar = ({ name, profileImage }: SideBarProp) => {
  return (
    <div className='w-64 h-screen bg-slate-600 text-white inline-block'>
      <Image src={profileImage} width={60} height={60} />
      <span>{name}</span>
      <hr />
      <Link href='/userlist'>
        <div className='hover:bg-gray-400 focus:bg-gray-400'>친구</div>
      </Link>
      <hr />
      <div className='hover:bg-gray-400 focus:bg-gray-400'>채팅</div>
      <hr />
      <div className='hover:bg-gray-400 focus:bg-gray-400'>그룹채팅</div>
      <hr />
    </div>
  );
};

export default MenuSideBar;
