import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../context/Auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { HiChatAlt2 } from "react-icons/hi";
import { auth } from "../../firebase";

const MenuSideBar = () => {
  const { logout } = useAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className='w-28 h-screen bg-gray-100  flex flex-col items-center justify-between text-center'>
        <div>
          <Link href='/home'>
            <div className='sideBarButton mt-7 '>
              <a>
                <AiFillHome size='1.8rem' className='inline-block' />
              </a>
            </div>
          </Link>
          <Link href='/chatlist'>
            <div className='sideBarButton'>
              <a>
                <BsFillChatFill size='1.7rem' className='inline-block' />
              </a>
            </div>
          </Link>

          <Link href='/groupchatlist'>
            <div className='sideBarButton'>
              <a>
                <HiChatAlt2 size='2.2rem' className='inline-block' />
              </a>
            </div>
          </Link>
        </div>
        <div>
          <Link href={`/my/${[user.uid]}`}>
            <div className='cursor-pointer'>
              {user.photoURL && (
                <Image
                  src={user.photoURL}
                  width={55}
                  height={55}
                  className='photoURL'
                  alt='propfileImage'
                />
              )}
            </div>
          </Link>
          <p className='font-semibold'>{user.displayName}</p>
          <button className='mb-6 mt-3' onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuSideBar;
