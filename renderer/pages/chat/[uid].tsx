import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MessageList from "../../components/message/MessageList";

import Title from "../../components/common/Title";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";
import {
  callGetDoc,
  callSaveDoc,
  deleteChatRoomList,
  makeMixUid,
} from "../../utils/firebase";
import { IoMdSend } from "react-icons/io";
import { ChatRoomData } from "../../types/ChatRoom";
import Textarea from "../../components/common/Textarea";

const Chat = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [chatUser, setChatUser] = useState<DocumentData>({
    email: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const {
    uid: currentUid,
    photoURL: currentPhotoURL,
    displayName: currentDisplayName,
  } = user;

  //메시지 저장될 collection 이름
  const mixUid = makeMixUid(uid, currentUid, chatUser.uid);

  //상대방 정보 가져오기
  const getChatUser = async () => {
    const user = await callGetDoc("users", String(uid));
    setChatUser(user);
  };

  useEffect(() => {
    getChatUser();
  }, []);

  //메시지 전송
  const sendMessageHandler = async () => {
    //채팅목록 저장
    const currentUserChatRoomData: ChatRoomData = {
      [chatUser.uid]: {
        user: {
          uid: chatUser.uid,
          displayName: chatUser.displayName,
          photoURL: chatUser.photoURL,
        },
        date: serverTimestamp(),
        lastMessage: message,
      },
    };

    const restUserChatRoomData: ChatRoomData = {
      [currentUid]: {
        user: {
          uid: currentUid,
          displayName: currentDisplayName,
          photoURL: currentPhotoURL,
        },
        date: serverTimestamp(),
        lastMessage: message,
      },
    };

    await callSaveDoc("chat rooms", currentUid, currentUserChatRoomData);
    await callSaveDoc("chat rooms", chatUser.uid, restUserChatRoomData);

    //메시지 저장
    const chatMessageData = {
      displayName: currentDisplayName,
      photoURL: currentPhotoURL,
      date: serverTimestamp(),
      message: message,
    };

    const chatMessageRef = collection(db, `message-${mixUid}`);
    await addDoc(chatMessageRef, chatMessageData);

    setMessage("");
  };

  const exitChatHandler = async () => {
    deleteChatRoomList("chat rooms", currentUid, chatUser.uid);
    router.replace("/chatlist");
  };

  return (
    <div className='flex flex-col justify-start h-screen p-3'>
      <div className='flex felx-row items-center justify-between'>
        <Title title={`${chatUser.displayName}`} />
        <div className='mt-4 p-3'>
          <button
            onClick={exitChatHandler}
            className='bg-gray-400 text-white rounded-3xl px-4 py-[0.5rem]'
          >
            채팅방 나가기
          </button>
        </div>
      </div>
      <MessageList />
      <div className='relative'>
        <Textarea
          setValue={setMessage}
          onKeyDown={sendMessageHandler}
          value={message}
          rows={3}
        />
        <button
          onClick={sendMessageHandler}
          className='absolute'
          disabled={!message.trim() ? true : false}
        >
          <IoMdSend
            size={28}
            className={`messageSendIcon ${
              !message.trim() ? "text-gray-200" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
