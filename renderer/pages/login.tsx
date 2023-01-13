import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setErrors({
        email: "",
        password: "이메일과 비밀번호를 입력해 주세요.",
      });
    }

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(() =>
          router.push("/home")
        );
      })
      .catch(error => {
        console.log(error.code);
        switch (error.code) {
          case "auth/wrong-password":
            return setErrors({
              email: "",
              password: "아이디와 비밀번호가 일치하지 않습니다.",
            });
          case "auth/user-not-found":
            return setErrors({
              email: "",
              password: "가입된 계정이 아닙니다.",
            });
          case "auth/invalid-email":
            return setErrors({
              email: "이메일 형식이 아닙니다.",
              password: "",
            });
          default:
            return setErrors({ email: "", password: "" });
        }
      });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='text-2xl'>Login</div>
      <form className='w-5/12' onSubmit={handleLogin}>
        <InputGroup
          type='text'
          placeholder='아이디'
          value={email}
          setValue={setEmail}
          error={errors.email}
        />
        <InputGroup
          type='password'
          placeholder='비밀번호'
          value={password}
          setValue={setPassword}
          error={errors.password}
        />
        <button className='bg-gray-700 text-white  w-full p-2'>로그인</button>
      </form>

      <Link href='/signup' className='font-bold w-'>
        계정이 없으신가요? 회원가입하기
      </Link>
    </div>
  );
};

export default Login;
