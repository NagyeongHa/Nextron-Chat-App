import React from "react";

const Signup = () => {
  return (
    <div>
      <div className='text-2xl'>signup</div>
      <form>
        <div>
          <div>이름</div>
          <input className='border rounded' type='text' />
        </div>
        <div>
          <div>아이디</div>
          <input className='border rounded' type='text' />
        </div>
        <div>
          <div>비밀번호</div>
          <input className='border rounded' type='text' />
        </div>
        <button className='bg-gray-700 text-white'>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
