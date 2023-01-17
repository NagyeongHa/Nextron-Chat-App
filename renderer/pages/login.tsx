import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/common/TextInput";
import { useAuth } from "../context/Auth";
import { blankCheck, loginErrors } from "../utils/validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const emailPasswordCheck = blankCheck(
      "이메일과 비밀번호를",
      email,
      password
    );

    if (!emailPasswordCheck.isvalid) {
      return setErrors({ ...errors, password: emailPasswordCheck.error });
    }
    setErrors({ ...errors, password: emailPasswordCheck.error });

    login(email, password)
      .then(() => {
        router.replace("/home");
      })
      .catch(error => {
        console.log(error);

        const result = loginErrors(error.code);
        if (result.type === "email") {
          return setErrors({ password: "", email: result.error });
        }
        return setErrors({ email: "", password: result.error });
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
