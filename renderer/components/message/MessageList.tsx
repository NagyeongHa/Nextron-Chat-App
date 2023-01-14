import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";

import MessageItem from "./MessageItem";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messageList, setMessageList] = useState<DocumentData>([]);
  const { user } = useAuth();
  const { uid } = useRouter().query;

  const mixedUid = user.uid > uid ? user.uid + uid : uid + user.uid;

  //메시지 가져오기
  useEffect(() => {
    const getMessageList = async () => {
      const messageRef = collection(db, `message-${mixedUid}`);
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

    getMessageList();
  }, []);

  return (
    <div className='overflow-y-scroll'>
      {!isLoading &&
        Object.values(messageList).map(item => (
          <MessageItem key={item.date} messages={item} />
        ))}
    </div>
  );
};

export default Messages;
