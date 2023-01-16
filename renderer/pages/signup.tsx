import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

import React, { useState } from "react";
import InputGroup from "../components/common/TextInput";
import { useAuth } from "../context/Auth";
import { db } from "../firebase";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!name.trim()) {
      setNameError("이름을 입력해 주세요.");
      return;
    }
    setNameError("");

    if (!email.trim()) {
      setEmailError("이메일을 입력해 주세요.");
      return;
    }
    setEmailError("");

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");
      return;
    }
    setPasswordError("");

    try {
      const create = await signUp(email, password);
      const user = create.user;
      const photoURL = `https://avatars.dicebear.com/api/big-ears-neutral/${user.email}.svg`;

      if (user) {
        await updateUserInfo(user, photoURL);
        await saveUser(user, photoURL);
      }

      document.location.href = "/login";
    } catch (error) {
      console.log(error.code);

      switch (error.code) {
        case "auth/email-already-in-use":
          return setEmailError("이미 가입된 계정입니다.");
        case "auth/weak-password":
          return setPasswordError("6자 이상 입력해주세요.");
        case "auth/missing-email":
          return setEmailError("이메일을 입력해 주세요,");
        case "auth/invalid-email":
          return setEmailError("이메일 형식이 아닙니다.");
        default:
          return setNameError(""), setPasswordError(""), setEmailError("");
      }
    }
  };

  const updateUserInfo = async (user, photoURL) => {
    try {
      await updateProfile(user, {
        photoURL,
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (user, photoURL) => {
    await setDoc(doc(db, "users", user.uid), {
      displayName: name,
      email,
      uid: user.uid,
      photoURL: photoURL,
    });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='text-2xl py-8 font-semibold'>Signup</div>
      <div className='w-4/12'>
        <div>
          <InputGroup
            type='text'
            value={name}
            setValue={setName}
            error={nameError}
            placeholder='이름'
            className='roundedInput'
          />
        </div>
        <div>
          <InputGroup
            type='text'
            value={email}
            setValue={setEmail}
            error={emailError}
            placeholder='이메일'
            className='roundedInput'
          />
        </div>
        <div>
          <InputGroup
            type='password'
            value={password}
            setValue={setPassword}
            error={passwordError}
            placeholder='비밀번호'
            className='roundedInput'
          />
        </div>
        <button className='pinkButton' onClick={handleSignUp}>
          회원가입
        </button>
      </div>

      <Link href='/login'>
        <a className='mt-3'>이미 계정이 있으신가요? 로그인하기</a>
      </Link>
    </div>
  );
};

export default Signup;
