import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/Auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { HiChatAlt2 } from "react-icons/hi";

const MenuSideBar = () => {
  const { user, logout } = useAuth();
  const { displayName, photoURL } = user;

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className='w-28 h-screen  bg-gray-100  flex flex-col items-center justify-between text-center'>
        <div>
          <Link href='/home'>
            <div className='p-3 m-3 mt-7  hover:bg-red-400 rounded-[10px]  hover:text-white text-[#c5c5c5]'>
              <a>
                <AiFillHome size='1.8rem' className='inline-block  ' />
              </a>
            </div>
          </Link>
          <Link href='/chatlist'>
            <div className='p-3 m-3 hover:bg-red-400 rounded-[10px]  hover:text-white text-[#c5c5c5] '>
              <a>
                <BsFillChatFill size='1.7rem' className='inline-block  ' />
              </a>
            </div>
          </Link>

          <Link href='/groupchat'>
            <div className='p-3 m-3 hover:bg-red-400 rounded-[10px] hover:text-white text-[#c5c5c5]'>
              <a>
                <HiChatAlt2 size='2.2rem' className='inline-block  ' />
              </a>
            </div>
          </Link>
        </div>
        <div>
          <div>
            {photoURL && (
              <Image
                src={photoURL}
                width={55}
                height={55}
                className='photoURL'
                alt='propfileImage'
              />
            )}
          </div>

          <button className='mb-6' onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuSideBar;
