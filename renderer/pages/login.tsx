import { browserLocalPersistence, setPersistence } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/TextInput";
import { useAuth } from "../context/Auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setErrors({
        email: "",
        password: "이메일과 비밀번호를 입력해 주세요.",
      });
    }

    setPersistence(auth, browserLocalPersistence).then(() => {
      login(email, password)
        .then(() => router.replace("/home"))
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
    });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='text-2xl py-10 font-semibold'>Login</div>
      <form className='w-4/12' onSubmit={handleLogin}>
        <div>
          <InputGroup
            type='text'
            placeholder='아이디'
            value={email}
            setValue={setEmail}
            error={errors.email}
            className='roundedInput'
          />
        </div>
        <div>
          <InputGroup
            type='password'
            placeholder='비밀번호'
            value={password}
            setValue={setPassword}
            error={errors.password}
            className='roundedInput'
          />
        </div>
        <button className='pinkButton'>로그인</button>
      </form>

      <Link href='/signup'>
        <a className='mt-3'>계정이 없으신가요? 회원가입하기</a>
      </Link>
    </div>
  );
};

export default Login;
