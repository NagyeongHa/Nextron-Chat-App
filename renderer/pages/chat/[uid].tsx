import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useState } from "react";
import Messages from "../../components/message/MessageList";

import Title from "../../components/Title";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";
import { callGetDoc, callSaveDoc } from "../../utils/firebase";
import { IoMdSend } from "react-icons/io";
import { ChatRoomList } from "../../types/ChatRoom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const {
    uid: currentUid,
    photoURL: currentPhotoURL,
    displayName: currentDisplayName,
  } = user;

  const [chatUser, setChatUser] = useState<DocumentData>({
    email: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const router = useRouter();
  const { uid } = router.query;

  //firestore collection 이름
  const mixedUid =
    currentUid > chatUser.uid
      ? currentUid + chatUser.uid
      : chatUser.uid + currentUid;

  //상대방 정보 가져오기
  useEffect(() => {
    const getChatUser = async () => {
      const user = await callGetDoc("users", String(uid));
      setChatUser(user);
    };

    getChatUser();
  }, []);

  //메시지 전송
  const sendMessage = async () => {
    //채팅목록에서 보이는 마지막 메시지 업데이트
    const currentUserChatRoomData: ChatRoomList = {
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

    const chatUserChatRoomData: ChatRoomList = {
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

    //메시지
    const chatMessageData = {
      displayName: currentDisplayName,
      photoURL: currentPhotoURL,
      date: serverTimestamp(),
      message: message,
    };

    const chatMessageRef = collection(db, `message-${mixedUid}`);
    await callSaveDoc("chat rooms", currentUid, currentUserChatRoomData);
    await callSaveDoc("chat rooms", chatUser.uid, chatUserChatRoomData);
    await addDoc(chatMessageRef, chatMessageData);

    setMessage("");
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      sendMessage();
    }
  };
  return (
    <div className='flex flex-col justify-start h-screen p-3'>
      <Title title={`${chatUser.displayName}`} />
      <Messages />
      <div className='relative'>
        <textarea
          className='w-full absloute border resize-none rounded-md mb-1'
          onChange={e => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
          value={message}
          rows={3}
        />
        <button
          onClick={sendMessage}
          className='absolute'
          disabled={!message.trim() ? true : false}
        >
          <IoMdSend
            size={28}
            className={`absolute  p-1 left-[-2rem] bottom-[-4rem] ${
              !message.trim() ? "text-gray-200" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
