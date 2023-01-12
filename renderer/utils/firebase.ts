import { doc, FieldValue, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Data {
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

export const callSaveDoc = async (
  collection: string,
  uid: string,
  data: Data
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
