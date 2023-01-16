import React from "react";
import ChatRoomItem from "../components/chat/ChatRoomItem";
import Title from "../components/common/Title";
import { useAuth } from "../context/Auth";
import useGetOnSnapShotDoc from "../hooks/useGetOnSnapShotDoc";

const ChatList = () => {
  const { user } = useAuth();
  const { uid } = user;

  const { data, isLoading } = useGetOnSnapShotDoc("chat rooms", uid);

  return (
    <div>
      <Title title='채팅' />
      <div>
        {!isLoading &&
          Object.values(data).map(item => (
            <ChatRoomItem key={item.date} chatRoom={item} />
          ))}
      </div>
    </div>
  );
};

export default ChatList;
