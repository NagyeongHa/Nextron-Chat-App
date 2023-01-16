import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChatRoomItem } from "../../types/ChatRoom";

interface ChatRoomProp {
  chatRoom: ChatRoomItem;
}
const ChatRoomItem = ({ chatRoom }: ChatRoomProp) => {
  const { user, lastMessage, date } = chatRoom;
  const { photoURL, displayName, uid } = user;

  return (
    <Link href={`/chat/${uid}`}>
      <div className='flex flex-row   hover:bg-red-50 px-10 py-4 justify-between cursor-pointer'>
        {photoURL && (
          <Image src={photoURL} width={55} height={55} className='photoURL' />
        )}
        <div className='flex flex-col w-full ml-3'>
          <span className='font-bold'>{displayName}</span>
          <span>{lastMessage}</span>
        </div>
        <div>{date && new Date(date.seconds * 1000).toLocaleTimeString()}</div>
      </div>
    </Link>
  );
};

export default ChatRoomItem;
