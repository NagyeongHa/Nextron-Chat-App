import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  QueryOrderByConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetOnSnapShotDoc = (
  collectionName: string,
  requirement: QueryOrderByConstraint | string
) => {
  const [data, setData] = useState<DocumentData>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCollection = async () => {
    //쿼리를 이용한 조회
    if (typeof requirement !== "string") {
      const queryString = query(collection(db, collectionName), requirement);
      await onSnapshot(queryString, querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });

        setData(data);
        setIsLoading(false);
      });
      return;
    }

    await onSnapshot(doc(db, collectionName, requirement), doc => {
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
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useGetOnSnapShotDoc;
