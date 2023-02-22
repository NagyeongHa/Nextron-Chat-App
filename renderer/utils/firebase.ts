import { updateProfile } from "@firebase/auth";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const callSaveDoc = async <T>(
  collection: string,
  uid: string,
  data: T
) => {
  return await setDoc(doc(db, collection, uid), data, { merge: true });
};

export const callGetDoc = async (collection: string, uid: string) => {
  const docSnap = await getDoc(doc(db, collection, uid));

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  }
};

export const getUsersCollection = async email => {
  const usersRef = collection(db, "users");
  const q = await query(usersRef, where("email", "!=", `${email}`));
  const data = await getDocs(q);
  const users = data.docs.map(doc => doc.data());
  return users;
};

export const updateUserInfo = async (user, photoURL, name) => {
  try {
    await updateProfile(user, {
      photoURL,
      displayName: name,
    });
  } catch (error) {
    console.log(error);
  }
};

export const callRemoveDoc = async (
  collectionName,
  currentUid,
  removeField
) => {
  await updateDoc(doc(db, collectionName, currentUid), {
    [`${removeField}`]: deleteField(),
  });
};

//채팅방 데이터 생성 함수
export const createChatRoomData = (userInfo, value, mixUid?) => {
  const data = {
    [mixUid ?? userInfo.uid]: {
      user: userInfo,
      date: serverTimestamp(),
      lastMessage: value,
    },
  };
  return data;
};

//메시지 데이터 생성 함수
export const createMessageData = (userInfo, value) => {
  const data = {
    displayName: userInfo.displayName,
    photoURL: userInfo.photoURL,
    date: serverTimestamp(),
    message: value,
  };
  return data;
};

export const makeMixUid = (
  routerUid: string[] | string,
  currentUid: string,
  restUid: string
) => {
  return String(routerUid).includes(",")
    ? String(routerUid).replaceAll(",", "")
    : currentUid > restUid
    ? restUid + currentUid
    : currentUid + restUid;
};
