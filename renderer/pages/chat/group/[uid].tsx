import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MessageList from "../../../components/message/MessageList";
import Title from "../../../components/common/Title";
import {
  callGetDoc,
  callSaveDoc,
  deleteChatRoomList,
  makeMixUid,
} from "../../../utils/firebase";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../../context/Auth";
import { db } from "../../../firebase";
import { GroupChatData } from "../../../types/ChatRoom";
import Textarea from "../../../components/common/Textarea";

const GroupChat = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();

  const [userNames, setUserNames] = useState("");
  const [message, setMessage] = useState("");
  const [mixUid, setMixUid] = useState("");
  const [chatUser, setChatUser] = useState<DocumentData>({
    email: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const {
    uid: currentUid,
    photoURL: currentPhotoURL,
    displayName: currentDisplayName,
  } = user;

  //콤마기준으로 uid 구분하고 배열에 담음
  const uidList = String(uid).split(",");

  //유저들 정보 가져오기
  const getChatUsers = () => {
    const users = [];
    uidList.map(uid => {
      callGetDoc("users", uid)
        .then(user => users.push(user))
        .then(() => getUserName());
    });

    setChatUser(users);
  };

  const getUserName = () => {
    if (chatUser.length) {
      const names = chatUser.map(user => user.displayName);
      setUserNames(names.join());
      return;
    }
  };

  useEffect(() => {
    const mixUid = makeMixUid(uid, currentUid, chatUser.uid);
    setMixUid(mixUid);
  }, []);

  useEffect(() => {
    getChatUsers();
  }, [mixUid]);

  //메시지 전송
  const sendMessageHandler = async () => {
    //채팅목록 저장
    const ChatRoomData: GroupChatData = {
      [mixUid]: {
        date: serverTimestamp(),
        lastMessage: message,
        user: chatUser,
      },
    };

    const saveRestUserChatRoom = async () => {
      await chatUser.map(user =>
        callSaveDoc("groupChat rooms", user.uid, ChatRoomData)
      );
    };

    await callSaveDoc("groupChat rooms", currentUid, ChatRoomData);
    saveRestUserChatRoom();

    //메시지 저장
    const chatMessageData = {
      displayName: currentDisplayName,
      photoURL: currentPhotoURL,
      date: serverTimestamp(),
      message: message,
    };

    const chatMessageRef = collection(db, `message-${mixUid}`);
    await addDoc(chatMessageRef, chatMessageData);

    setMessage("");
  };

  return (
    <div className='flex flex-col justify-start h-screen p-3'>
      <Title title={`${userNames} (${chatUser.length})`} />

      <MessageList />
      <div className='relative'>
        <Textarea
          setValue={setMessage}
          onKeyDown={sendMessageHandler}
          value={message}
          rows={3}
        />
        <button
          onClick={sendMessageHandler}
          className='absolute'
          disabled={!message.trim() ? true : false}
        >
          <IoMdSend
            size={28}
            className={`messageSendIcon ${
              !message.trim() ? "text-gray-200" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
