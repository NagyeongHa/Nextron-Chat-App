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
      {!isLoading && data.length ? (
        data.map(item => <GroupChatRoomItem key={item.date} chatList={item} />)
      ) : (
        <div className='px-10 py-7 text-gray-400'>
          그룹 채팅방을 만들어 보세요 : )
        </div>
      )}
    </div>
  );
};

export default GroupChat;
