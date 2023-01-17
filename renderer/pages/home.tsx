import React, { useEffect, useState } from "react";
import Head from "next/head";
import Title from "../components/common/Title";
import Image from "next/image";
import Link from "next/link";
import { getUsersCollection } from "../utils/firebase";
import { useAuth } from "../context/Auth";
import { BiMessageAdd } from "react-icons/bi";
import { useRouter } from "next/router";
function Home() {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHiddenCheckBox, setIsHiddenCheckBox] = useState(true);
  const [checkedUserList, setCheckedUserList] = useState([]);
  const router = useRouter();

  //유저목록 가져오기
  const getUsers = async () => {
    const users = await getUsersCollection(user.email);
    setUserList(users);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  //채팅 추가 버튼 클릭
  const clickedAddIconHandler = () => {
    setIsHiddenCheckBox(!isHiddenCheckBox);
    !isHiddenCheckBox && cancelHandler();
  };

  //유저 체크박스
  const checkedUserHandler = (checked, uid) => {
    checked
      ? setCheckedUserList(pre => [...pre, uid])
      : setCheckedUserList(pre => [...pre.filter(item => item !== uid)]);
  };

  //채팅방 생성
  const addNewChatRoomHandler = () => {
    const addCurrentUid = checkedUserList.concat(user.uid);
    const sortUid = addCurrentUid.sort();

    checkedUserList.length && checkedUserList.length === 1
      ? router.push(`/chat/${checkedUserList.join("")}`)
      : router.push(`/chat/group/${sortUid}`);
  };

  const cancelHandler = () => {
    setIsHiddenCheckBox(true);
    setCheckedUserList([]);
  };
  return (
    <div>
      <Head>
        <title></title>
      </Head>
      <div className='flex flex-row justify-between items-center'>
        <Title title={`유저 목록 (${userList.length})`} />
        <div className='flex flex-row items-center'>
          <button
            onClick={addNewChatRoomHandler}
            className='mt-4 mr-2 text-white bg-red-400 px-3 py-1 text-lg rounded-3xl'
            hidden={isHiddenCheckBox}
            disabled={!checkedUserList.length}
          >
            확인
          </button>
          <button
            onClick={cancelHandler}
            className='mt-4 mr-2 text-white bg-gray-400 px-3 py-1 text-lg rounded-3xl'
            hidden={isHiddenCheckBox}
          >
            취소
          </button>
          <button onClick={clickedAddIconHandler}>
            <BiMessageAdd
              size={50}
              color='gray'
              className='inline-block p-2 mt-5 mr-7 hover:bg-gray-100 rounded-3xl'
            />
          </button>
        </div>
      </div>
      <div className='h-full'>
        {!isLoading &&
          userList.map(user => (
            <div
              key={user.email}
              className='px-10 py-4  hover:bg-red-50 flex flex-row items-center'
            >
              <input
                type='checkbox'
                className='mr-4'
                hidden={isHiddenCheckBox}
                checked={checkedUserList.includes(user.uid) ? true : false}
                onChange={e => checkedUserHandler(e.target.checked, user.uid)}
              />
              <Link href={`/chat/${[user.uid]}`}>
                <div className='w-full'>
                  <div className='cursor-pointer flex-row flex items-center'>
                    <Image
                      className='photoURL'
                      src={user.photoURL}
                      width={50}
                      height={50}
                    ></Image>
                    <span className='ml-3'>{user.displayName}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
