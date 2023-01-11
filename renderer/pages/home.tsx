import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { auth } from "../firebase";
import Image from "next/image";
import MenuSideBar from "../components/MenuSideBar";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";

function Home() {
  const onAuthState = useOnAuthStateChange();
  const { isLoggedin, userInfo } = onAuthState;

  console.log(isLoggedin, userInfo);

  return (
    <>
      <Head>
        <title></title>
      </Head>
      {isLoggedin && (
        <MenuSideBar
          name={userInfo.name}
          profileImage={userInfo.profileImage}
        />
      )}
      <Link href='/signup'>
        <button className='btn-blue'>회원가입</button>
      </Link>
      <Link href='/login'>
        <button className='btn-blue'>로그인</button>
      </Link>
    </>
  );
}

export default Home;
