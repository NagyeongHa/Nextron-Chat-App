import React, { useEffect, useState } from "react";
import Head from "next/head";
import useOnAuthStateChange from "../hooks/useOnAuthStateChange";
import Title from "../components/Title";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

function Home() {
  const onAuthState = useOnAuthStateChange();
  const { isLoggedin, userInfo } = onAuthState;
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const getUserCollection = await getDocs(collection(db, "users"));
      const users = getUserCollection.docs.map(doc => doc.data());
      setUserList(users);
    };
    getUsers();
  }, []);

  console.log(userList);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Title title='유저 목록' />
      {userList.map(user => (
        <div key={user.email}>
          <Image
            className='rounded-2xl'
            src={user.profileimage}
            width={50}
            height={50}
          ></Image>{" "}
          {user.name}
        </div>
      ))}
    </>
  );
}

export default Home;
