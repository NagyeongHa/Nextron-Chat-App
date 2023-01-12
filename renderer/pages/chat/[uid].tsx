import { DocumentData, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useOnAuthStateChange from "../../hooks/useOnAuthStateChange";
import { callGetDoc, callSaveDoc } from "../../utils/firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const onAuth = useOnAuthStateChange();
  const { uid: currentUid } = onAuth.userInfo;
  const [chatUser, setChatUser] = useState<DocumentData>({
    email: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const router = useRouter();
  const { uid } = router.query;

  //상대방 정보 가져오기
  useEffect(() => {
    const getChatUser = async () => {
      const user = await callGetDoc("users", String(uid));
      setChatUser(user);
    };

    getChatUser();
  }, []);

  //메세지 작성
  const writeMessage = async e => {
    e.preventDefault();

    const data = {
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

    callSaveDoc("chat room", currentUid, data);
  };

  return (
    <div className='flex flex-col justify-between h-full p-3'>
      상대의 uid -{uid}
      {chatUser.displayName}
      <form onSubmit={writeMessage}>
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
