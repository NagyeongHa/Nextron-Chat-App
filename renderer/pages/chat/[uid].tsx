import {
  addDoc,
  collection,
  DocumentData,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Messages from "../../components/message/Messages";

import Title from "../../components/Title";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";
import { callGetDoc, callSaveDoc } from "../../utils/firebase";
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

    // const chatRoomRef = doc(db, "chat rooms", currentUid);
    // await setDoc(chatRoomRef, chatRoomData);

    const chatMessageRef = collection(db, `message-${mixedUid}`);

    await callSaveDoc("chat rooms", currentUid, currentUserChatRoomData);
    await callSaveDoc("chat rooms", chatUser.uid, chatUserChatRoomData);
    const test = await addDoc(chatMessageRef, chatMessageData);
    console.log(test.id);

    setMessage("");
  };

  return (
    <div className='flex flex-col justify-between h-full p-3'>
      <Title title={`${chatUser.displayName} - ${chatUser.uid}`} />

      <form onSubmit={sendMessage}>
        <Messages />
        <textarea
          className='w-4/5'
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <button>전송</button>
      </form>
    </div>
  );
};

export default Chat;
