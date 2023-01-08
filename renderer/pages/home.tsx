import React from "react";
import Head from "next/head";
import Link from "next/link";

function Home() {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/next'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
      </div>
      <Link href='/signup'>
        <button className='btn-blue'>회원가입</button>
      </Link>
    </>
  );
}

export default Home;
