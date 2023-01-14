import {
  addDoc,
  collection,
  DocumentData,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Messages from "../../components/message/MessageList";

import Title from "../../components/Title";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";
import { callGetDoc, callSaveDoc } from "../../utils/firebase";
import { IoMdSend } from "react-icons/io";
interface ChatRoom {
  [x: string]: {
    user: {
      uid: string;
      displayName: string;
      photoURL: string;
    };
    date: FieldValue;
    lastMessage: string;
  };
}

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
  const sendMessage = async e => {
    e.preventDefault();

    //채팅목록에서 보이는 마지막 메시지 업데이트
    const currentUserChatRoomData: ChatRoom = {
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

    const chatUserChatRoomData: ChatRoom = {
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

  return (
    <div className='flex flex-col justify-between h-full p-3'>
      <Title title={`${chatUser.displayName} - ${chatUser.uid}`} />
      <Messages />
      <form onSubmit={sendMessage}>
        <div className='relative w-full h-full'>
          <textarea
            className='w-full relative  border resize-none rounded-md mb-1'
            onChange={e => setMessage(e.target.value)}
            value={message}
            rows={3}
          />
          <button>
            <IoMdSend
              size={28}
              className='absolute inline-block p-1 left-[89rem] bottom-[1rem]'
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
