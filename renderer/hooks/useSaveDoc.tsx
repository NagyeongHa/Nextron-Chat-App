import { doc, FieldValue, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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

const useSaveDoc = (collection: string, currentUid: string, data: Data) => {
  const [isSaved, setIsSaved] = useState(false);

  const saveDoc = async () => {
    await setDoc(doc(db, collection, currentUid), data, { merge: true });
    setIsSaved(true);
  };

  useEffect(() => {
    saveDoc();

    return () => {
      saveDoc();
    };
  }, []);

  return { isSaved };
};

export default useSaveDoc;
