import { addDoc, collection, DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MessageList from "../../components/message/MessageList";

import Title from "../../components/common/Title";
import { useAuth } from "../../context/Auth";
import { db } from "../../firebase";
import {
  callGetDoc,
  callRemoveDoc,
  callSaveDoc,
  createChatRoomData,
  createMessageData,
  makeMixUid,
} from "../../utils/firebase";
import { ChatRoomData, GroupChatData } from "../../types/ChatRoom";
import Textarea from "../../components/common/Textarea";

const Chat = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [chatUser, setChatUser] = useState<DocumentData>({
    email: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const currentUser = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName,
  };

  const isGroupChat = () => {
    if (uid.includes(",")) {
      return true;
    }
    return false;
  };

  const uidList = isGroupChat() ? String(uid).split(",") : String(uid);
  const mixUid = makeMixUid(uid, user.uid, chatUser.uid);

  const getChatUser = async () => {
    if (typeof uidList === "string") {
      const data = await callGetDoc("users", uidList);
      setChatUser(data);
      return;
    }

    const users = [];

    await Promise.all(
      uidList.map(async uid => {
        const data = await callGetDoc("users", uid);
        users.push(data);
      })
    );

    setChatUser(users);
  };

  useEffect(() => {
    getChatUser();
  }, []);

  //메시지 전송
  const sendMessageHandler = async () => {
    try {
      const messageRef = collection(db, `message-${mixUid}`);

      //개인채팅
      if (!isGroupChat()) {
        const userChatRoomData: ChatRoomData = createChatRoomData(
          chatUser,
          message
        );
        const restUserChatRoomData: ChatRoomData = createChatRoomData(
          currentUser,
          message
        );

        //채팅목록 저장
        await callSaveDoc("chat rooms", currentUser.uid, userChatRoomData);
        await callSaveDoc("chat rooms", chatUser.uid, restUserChatRoomData);

        //메시지 저장
        const messageData = createMessageData(currentUser, message);
        await addDoc(messageRef, messageData);

        return;
      }

      //그룹채팅
      const groupChatRoomData: GroupChatData = createChatRoomData(
        chatUser,
        message,
        mixUid
      );

      //채팅목록 저장
      await chatUser.map(user => {
        callSaveDoc("groupChat rooms", user.uid, groupChatRoomData);
      });

      //메시지 저장
      const groupChatMessageData = createMessageData(currentUser, message);
      await addDoc(messageRef, groupChatMessageData);
    } catch (error) {
      console.log("error :", error);
    } finally {
      setMessage("");
    }
  };

  const exitChatHandler = async () => {
    const collectionName = isGroupChat() ? "groupChat rooms" : "chat rooms";
    const removeField = isGroupChat() ? mixUid : chatUser.uid;

    callRemoveDoc(collectionName, currentUser.uid, removeField);
    router.back();
  };

  return (
    <div className='flex flex-col justify-start h-screen p-3'>
      <div className='flex felx-row items-center justify-between'>
        <Title
          title={`${
            !isGroupChat()
              ? chatUser.displayName + " (2)"
              : Object.values(chatUser)
                  .filter(item => item.displayName !== currentUser.displayName)
                  .map(item => item.displayName)
                  .join(", ") + ` (${chatUser.length})`
          } `}
        />
        <div className='mt-4 p-3'>
          <button
            onClick={exitChatHandler}
            className='bg-gray-400 text-white rounded-3xl px-4 py-[0.5rem]'
          >
            채팅방 나가기
          </button>
        </div>
      </div>
      <MessageList />
      <Textarea
        setValue={setMessage}
        sendHandler={sendMessageHandler}
        value={message}
        rows={3}
      />
    </div>
  );
};

export default Chat;
