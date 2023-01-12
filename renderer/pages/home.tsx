import React, { useEffect, useState } from "react";
import Head from "next/head";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";
import Title from "../components/Title";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";
import Link from "next/link";

function Home() {
  const onAuthState = useOnAuthStateChange();
  const { userInfo } = onAuthState;
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    const usersRef = collection(db, "users");
    const q = await query(usersRef, where("email", "!=", `${userInfo.email}`));
    const data = await getDocs(q);
    const users = data.docs.map(doc => doc.data());
    console.log(userInfo);
    console.log("===============", users);

    setUserList(users);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();

    return () => {
      getUsers();
    };
  }, [isLoading]);

  console.log(userList);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Title title='유저 목록' />
      {!isLoading &&
        userList.map(user => (
          <>
            <Link href={`/chat/${[user.uid]}`}>
              <div className='cursor-pointer' key={user.email}>
                <Image
                  className='rounded-2xl'
                  src={user.photoURL}
                  width={50}
                  height={50}
                ></Image>
                {user.displayName}
              </div>
            </Link>
          </>
        ))}
    </>
  );
}

export default Home;
