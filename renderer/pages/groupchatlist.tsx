import React from "react";
import GroupChatRoomItem from "../components/groupChat/GroupChatRoomItem";
import Title from "../components/common/Title";
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
        data.map(item => <GroupChatRoomItem key={item.date} chatList={item} />)}
    </div>
  );
};

export default GroupChat;
