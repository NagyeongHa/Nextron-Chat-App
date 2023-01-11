import React from "react";
import Head from "next/head";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";
import Title from "../components/Title";

function Home() {
  const onAuthState = useOnAuthStateChange();
  const { isLoggedin, userInfo } = onAuthState;

  console.log(isLoggedin, userInfo);

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div>
        <Title title='유저 목록' />
      </div>
    </>
  );
}

export default Home;
