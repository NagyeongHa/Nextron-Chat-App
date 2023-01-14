import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ChatRoom {
  lastMessage: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  user: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}

interface ChatRoomProp {
  chatRoom: ChatRoom;
}
const ChatRoomItem = ({ chatRoom }: ChatRoomProp) => {
  const { user, lastMessage, date } = chatRoom;
  const { photoURL, displayName, uid } = user;

  return (
    <Link href={`/chat/${uid}`}>
      <div className='flex flex-row bg-gray-200 justify-between cursor-pointer'>
        {photoURL && <Image src={photoURL} width={55} height={55} />}
        <div className='flex flex-col w-full'>
          <span>{displayName}</span>
          <span>{lastMessage}</span>
        </div>
        <div>{date.seconds}</div>
      </div>
    </Link>
  );
};

export default ChatRoomItem;
