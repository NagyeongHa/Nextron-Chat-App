import React from "react";
import GroupChatItem from "../components/groupChat/GroupChatItem";
import Title from "../components/Title";
import { useAuth } from "../context/Auth";
import useGetOnSnapShotDoc from "../hooks/useGetOnSnapShotDoc";

const GroupChat = () => {
  const { user } = useAuth();
  const { uid } = user;
  const { data, isLoading } = useGetOnSnapShotDoc("groupChat rooms", uid);

  return (
    <div>
      <Title title='그룹 채팅' />
      {!isLoading &&
        data.map(item => <GroupChatItem key={item.uid} chatList={item} />)}
    </div>
  );
};

export default GroupChat;
