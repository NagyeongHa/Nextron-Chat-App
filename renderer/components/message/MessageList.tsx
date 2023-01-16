import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";

import MessageItem from "./MessageItem";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messageList, setMessageList] = useState<DocumentData>([]);
  const messageBoxRef = useRef<HTMLDivElement>();
  const { user } = useAuth();
  const { uid } = useRouter().query;

  const makeUid = String(uid).includes(",")
    ? String(uid).replaceAll(",", "")
    : user.uid > uid
    ? uid + user.uid
    : user.uid + uid;

  //메시지 가져오기
  const getMessageList = async () => {
    const messageRef = collection(db, `message-${makeUid}`);
    const q = query(messageRef, orderBy("date", "asc"));
    onSnapshot(q, querySnapshot => {
      const message = [];
      querySnapshot.forEach(doc => {
        message.push(doc.data());
      });

      setMessageList(message);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getMessageList();
  }, []);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className='overflow-y-scroll h-full' ref={messageBoxRef}>
      {!isLoading &&
        Object.values(messageList).map(item => (
          <MessageItem key={item.date} messages={item} />
        ))}
    </div>
  );
};

export default Messages;
