import React, { useEffect, useState } from "react";
import Head from "next/head";
import Title from "../components/Title";
import Image from "next/image";
import Link from "next/link";
import { getUsersCollection } from "../utils/firebase";
import { useAuth } from "../context/Auth";

function Home() {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //유저목록 가져오기
  useEffect(() => {
    const getUsers = async () => {
      const users = await getUsersCollection(user.email);
      setUserList(users);
      setIsLoading(false);
    };

    getUsers();

    return () => {
      getUsers();
    };
  }, [isLoading]);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Title title='유저 목록' />
      {!isLoading &&
        userList.map(user => (
          <div key={user.email}>
            <Link href={`/chat/${[user.uid]}`}>
              <div className='cursor-pointer'>
                <Image
                  className='rounded-2xl'
                  src={user.photoURL}
                  width={50}
                  height={50}
                ></Image>
                {user.displayName}
                {user.uid}
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}

export default Home;
