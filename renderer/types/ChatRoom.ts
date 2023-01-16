import { DocumentData, FieldValue } from "firebase/firestore";

export interface ChatRoomData {
  [x: string]: {
    user: {
      uid: string;
      displayName: string;
      photoURL: string;
      email?: string;
    };
    date: FieldValue;
    lastMessage: string;
  };
}

export interface ChatRoomItem extends DefaultChat {
  user: { displayName: string; photoURL: string; uid: string };
}

export interface GroupChatData {
  [x: string]: {
    date: FieldValue;
    lastMessage: string;
    user: DocumentData;
  };
}

export interface GroupChatRoomItem extends DefaultChat {
  user: { displayName: string; photoURL: string; uid: string }[];
}

export interface DefaultChat {
  lastMessage: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}
