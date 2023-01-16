import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GroupChatRoomItem } from "../../types/ChatRoom";

interface ChatRoomProp {
  chatList: GroupChatRoomItem;
}

const GroupChatItem = ({ chatList }: ChatRoomProp) => {
  const { user, date } = chatList;
  const userList = user.map(user => user.uid);
  const groupuid = userList.sort();

  return (
    <Link href={`/chat/group/${groupuid}`}>
      <div className='flex flex-row justify-between items-center hover:bg-red-50 px-9 py-4'>
        <div className='w-[6rem]'>
          {user.map((user, index) => (
            <span key={index} className='p-1'>
              <Image
                src={user.photoURL}
                width={30}
                height={30}
                className='rounded-xl'
              />
            </span>
          ))}
        </div>
        <div className='flex flex-col w-full ml-2'>
          <div>
            {user.map((user, index) => (
              <span key={index} className='font-bold'>
                {user.displayName}{" "}
              </span>
            ))}
            {`(${userList.length})`}
          </div>
          <div>{chatList.lastMessage}</div>
        </div>
        <div>{date && new Date(date.seconds * 1000).toLocaleTimeString()}</div>
      </div>
    </Link>
  );
};

export default GroupChatItem;
