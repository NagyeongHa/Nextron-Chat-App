import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
