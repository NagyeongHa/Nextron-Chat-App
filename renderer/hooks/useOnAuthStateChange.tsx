import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { UserInfo } from "../types/UserInfo";

const useOnAuthStateChange = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    uid: "",
    email: "",
    photoURL: "",
    displayName: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });
        return setIsLoggedin(true);
      }
      return setIsLoggedin(false);
    });
  }, []);

  return { isLoggedin, userInfo };
};

export default useOnAuthStateChange;
