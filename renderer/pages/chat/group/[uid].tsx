import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, {
  useEffect,
  KeyboardEvent,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import MessageList from "../../../components/message/MessageList";
import Title from "../../../components/Title";
import { callGetDoc, callSaveDoc } from "../../../utils/firebase";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../../context/Auth";
import { db } from "../../../firebase";

const GroupChat = () => {
  const router = useRouter();
  const { uid } = router.query;

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
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

  const mixUid = String(uid).replaceAll(",", "");
  console.log("ssssssss", mixUid);

  //콤마기준으로 uid 구분하고 배열에 담음
  const uidList = String(uid).split(",");

  //유저들 정보 가져오기
  const getChatUsers = async () => {
    const users = [];
    await uidList.map(uid => {
      callGetDoc("users", uid).then(user => users.push(user));
    });

    setChatUser(users);
    setIsLoading(false);
  };

  useEffect(() => {
    getChatUsers();
  }, []);

  //   const makeName = () => {
  //     const userName = Object.values(chatUser).map(user => user.displayName);
  //     console.log("userName", userName);

  //     const name = userName.reduce((acc, cur) => {
  //       return `${acc} ` + cur;
  //     }, "");
  //     console.log("name", name);

  //     setUserName(name);
  //   };

  // useEffect(() => {
  //   makeName();
  //   console.log(isLoading);
  // }, [isLoading, chatUser]);

  console.log(isLoading);

  const sendMessage = async () => {
    console.log("dda", mixUid);

    const ChatRoomData = {
      [mixUid]: {
        date: serverTimestamp(),
        lastMessage: message,
        user: chatUser,
      },
    };

    //메시지
    const chatMessageData = {
      displayName: currentDisplayName,
      photoURL: currentPhotoURL,
      date: serverTimestamp(),
      message: message,
    };

    const saveRestUserChatRoom = async () => {
      await chatUser.map(user =>
        callSaveDoc("groupChat rooms", user.uid, ChatRoomData)
      );
    };

    const chatMessageRef = collection(db, `message-${mixUid}`);

    await callSaveDoc("groupChat rooms", currentUid, ChatRoomData);
    saveRestUserChatRoom();
    await addDoc(chatMessageRef, chatMessageData);
    // await callSaveDoc("chat rooms", chatUser.uid, chatUserChatRoomData);

    setMessage("");

    //     const chatUserChatRoomData = {};
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      sendMessage();
    }
  };

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className='flex flex-col justify-start h-screen p-3'>
      {/* <Title title={`${userName} (${uidList.length})`} /> */}
      <MessageList />
      <div className='relative'>
        <textarea
          className='w-full absloute border resize-none rounded-md mb-1'
          onChange={onChangeHandler}
          onKeyDown={onEnterPress}
          value={message}
          rows={3}
        />
        <button
          onClick={sendMessage}
          className='absolute'
          disabled={!message.trim() ? true : false}
        >
          <IoMdSend
            size={28}
            className={`absolute  p-1 left-[-2rem] bottom-[-4rem] ${
              !message.trim() ? "text-gray-200" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
