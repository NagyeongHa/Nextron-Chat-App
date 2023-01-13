import React from "react";
import { Message } from "../../types/Message";

interface MessageProp {
  message: Message;
}

const MessageItem = ({ message }: MessageProp) => {
  console.log("??????", message);

  return <div>{message.message}</div>;
};

export default MessageItem;
