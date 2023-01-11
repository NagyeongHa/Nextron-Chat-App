import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

interface UserInfo {
  name: string;
  profileImage: string;
}
const useOnAuthStateChange = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserInfo({
          name: user.displayName,
          profileImage: user.photoURL,
        });
        return setIsLoggedin(true);
      }
      return setIsLoggedin(false);
    });
  }, []);

  return { isLoggedin, userInfo };
};

export default useOnAuthStateChange;
