import { orderBy } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth";
import useGetOnSnapShotDoc from "../../hooks/useGetOnSnapShotDoc";
import { makeMixUid } from "../../utils/firebase";
import Loading from "../common/Loading";

import MessageItem from "./MessageItem";

const Messages = () => {
  const messageBoxRef = useRef<HTMLDivElement>();
  const { user } = useAuth();
  const { uid } = useRouter().query;

  const mixUid = makeMixUid(uid, user.uid, String(uid));
  const q = orderBy("date", "asc");
  const { data, isLoading } = useGetOnSnapShotDoc(`message-${mixUid}`, q);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageBoxRef.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      }
    };

    scrollToBottom();

    return () => scrollToBottom();
  }, [data]);

  return (
    <div className='overflow-y-scroll h-full' ref={messageBoxRef}>
      {!isLoading ? (
        Object.values(data).map(item => (
          <MessageItem key={item.date} messages={item} />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Messages;
