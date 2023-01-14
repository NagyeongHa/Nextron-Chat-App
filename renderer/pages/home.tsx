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
  }, [user]);

  console.log(user);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Title title='유저 목록' />
      {!isLoading &&
        userList.map(user => (
          <div key={user.email} className='px-8 py-4  hover:bg-red-50'>
            <Link href={`/chat/${[user.uid]}`}>
              <div className='cursor-pointer flex flex-row items-center'>
                <Image
                  className='photoURL'
                  src={user.photoURL}
                  width={50}
                  height={50}
                ></Image>
                <span className='ml-3'>{user.displayName}</span>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}

export default Home;

// export async function getServerSideProps() {
//   const { user } = useAuth();
//   const users = await getUsersCollection(user.email);

//   return {
//     props: { user: users },
//   };
// }
