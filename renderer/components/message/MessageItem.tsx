import Image from "next/image";
import React from "react";
import { useAuth } from "../../context/Auth";
import { Message } from "../../types/Message";

interface MessageProp {
  messages: Message;
}

const MessageItem = ({ messages }: MessageProp) => {
  const { user } = useAuth();
  const { photoURL, message, displayName, date } = messages;

  const isMessageFromUser = () => {
    return displayName === user?.displayName;
  };

  return (
    <div>
      {isMessageFromUser() ? (
        <div className='flex items-center mx-4  flex-row-reverse'>
          <div className='flex items-center flex-row-reverse'>
            {photoURL && (
              <Image
                src={photoURL}
                width={55}
                height={55}
                className='photoURL'
              />
            )}
            <div className='flex flex-col items-end m-3'>
              <div>{displayName}</div>
              <div className='p-5 rounded-2xl rounded-tr-none bg-red-100'>
                {message}
              </div>
            </div>
          </div>
          <div>
            {date && new Date(date.seconds * 1000).toLocaleTimeString()}
          </div>
        </div>
      ) : (
        <div className='flex items-center mx-4  flex-row'>
          <div className='flex items-center flex-row'>
            {photoURL && (
              <Image
                src={photoURL}
                width={55}
                height={55}
                className='photoURL'
              />
            )}
            <div className='flex flex-col items-start m-3'>
              <div>{displayName}</div>
              <div className='p-5 rounded-2xl rounded-tl-none bg-gray-200'>
                {message}
              </div>
            </div>
          </div>
          <div>
            {date && new Date(date.seconds * 1000).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
