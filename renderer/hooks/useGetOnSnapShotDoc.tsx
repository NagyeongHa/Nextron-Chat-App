import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetOnSnapShotDoc = (collection: string, uid: string) => {
  const [data, setData] = useState<DocumentData>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getChatRoomCollection = async () => {
    await onSnapshot(doc(db, collection, uid), doc => {
      const result = doc.data();

      if (result) {
        const data = Object.values(result).map(item => item);

        setData(data);
        setIsLoading(false);
        return;
      }
    });
  };

  useEffect(() => {
    getChatRoomCollection();
  }, []);

  return { data, isLoading };
};

export default useGetOnSnapShotDoc;
