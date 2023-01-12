import Image from "next/image";
import Link from "next/link";
import React from "react";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";

const MenuSideBar = () => {
  const onAuth = useOnAuthStateChange();
  const { userInfo } = onAuth;
  const { displayName, photoURL } = userInfo;

  return (
    <>
      <div className='w-64 h-screen bg-slate-600 text-white inline-block'>
        {photoURL && (
          <Image
            src={photoURL}
            width={55}
            height={55}
            className='p-3 rounded-full'
            alt='propfileImage'
          />
        )}
        <span>{displayName}</span>
        <hr />
        <Link href='/home'>
          <div className='hover:bg-gray-400 focus:bg-gray-400'>친구</div>
        </Link>
        <hr />
        <Link href='/chat'>
          <div className='hover:bg-gray-400 focus:bg-gray-400'>채팅</div>
        </Link>
        <hr />
        <Link href='/groupchat'>
          <div className='hover:bg-gray-400 focus:bg-gray-400'>그룹채팅</div>
        </Link>

        <hr />
        <Link href='/signup'>
          <button className='btn-blue'>회원가입</button>
        </Link>
        <Link href='/login'>
          <button className='btn-blue'>로그인</button>
        </Link>
      </div>
    </>
  );
};

export default MenuSideBar;
