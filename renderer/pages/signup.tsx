import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputGroup from "../components/common/TextInput";
import { useAuth } from "../context/Auth";
import { callSaveDoc, updateUserInfo } from "../utils/firebase";
import { blankCheck, signUpErrors } from "../utils/validator";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    const nameCheck = blankCheck("이름을", name);
    if (!nameCheck.isvalid) return setNameError(nameCheck.error);
    setNameError(nameCheck.error);

    const emailCheck = blankCheck("이메일을", email);
    if (!emailCheck.isvalid) return setEmailError(emailCheck.error);
    setEmailError(emailCheck.error);

    const passwordCheck = blankCheck("비밀번호를", password);
    if (!passwordCheck.isvalid) return setPasswordError(passwordCheck.error);
    setPasswordError(passwordCheck.error);

    try {
      const create = await signUp(email, password);
      const user = create.user;
      const photoURL = `https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=${user.email}&backgroundColor=f8b788,ffdfbf,da9969,ffd5dc`;

      if (user) {
        const userInfo = {
          displayName: name,
          email,
          uid: user.uid,
          photoURL: photoURL,
        };

        await updateUserInfo(user, photoURL, name);
        await callSaveDoc("users", user.uid, userInfo);
      }
      router.push("/login");
    } catch (error) {
      const result = signUpErrors(error.code);

      if (result.type === "email") {
        return setEmailError(result.error);
      }
      return setPasswordError(result.error);
    }
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
