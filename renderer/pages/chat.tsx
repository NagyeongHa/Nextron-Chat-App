import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ChatRoomItem from "../components/ChatRoomItem";
import Title from "../components/Title";
import { useAuth } from "../context/Auth";
import { db } from "../firebase";
// interface ChatRoom {
//   lastMessage: string;
//   date: {
//     seconds: number;
//     nanoseconds: number;
//   };
//   user: {
//     displayName: string;
//     photoURL: string;
//     uid: string;
//   };
// }

// const initial = {
//   lastMessage: "",
//   date: {
//     seconds: 0,
//     nanoseconds: 0,
//   },
//   user: {
//     displayName: "",
//     photoURL: "",
//     uid: "",
//   },
// };
const Chat = () => {
  const { user } = useAuth();
  const { uid } = user;
  const [chatRoomList, setChatRoomList] = useState<DocumentData>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChatRoomCollection = () => {
      onSnapshot(doc(db, "chat rooms", uid), doc => {
        const data = doc.data();
        const chatRoom = Object.values(data).map(item => item);
        setChatRoomList(chatRoom);
      });
      setIsLoading(false);
    };

    getChatRoomCollection();

    return () => {
      getChatRoomCollection();
    };
  }, []);

  return (
    <div>
      <Title title='채팅' />
      <div>
        {!isLoading &&
          chatRoomList.map(item => (
            <ChatRoomItem key={item.user.uid} chatRoom={item} />
          ))}
      </div>
    </div>
  );
};

export default Chat;
