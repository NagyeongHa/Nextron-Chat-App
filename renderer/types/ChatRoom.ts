import { FieldValue } from "firebase/firestore";

export interface ChatRoomList {
  [x: string]: {
    user: {
      uid: string;
      displayName: string;
      photoURL: string;
    };
    date: FieldValue;
    lastMessage: string;
  };
}

export interface GroupChatRoomItem {
  lastMessage: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  user: { displayName: string; photoURL: string; uid: string }[];
}

export interface ChatRoomItem {
  lastMessage: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  user: { displayName: string; photoURL: string; uid: string };
}
