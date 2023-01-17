import Image from "next/image";
import React from "react";
import Title from "../../components/common/Title";
import { useAuth } from "../../context/Auth";

const Me = () => {
  const { user } = useAuth();
  const { displayName, photoURL, email } = user;
  return (
    <div>
      <Title title={`${displayName}님의 마이페이지`} />
      <div className='flex flex-col h-[80vh] justify-center items-center p-7'>
        {photoURL && (
          <Image src={photoURL} width={70} height={70} className='photoURL' />
        )}
        <p className='p-3 font-semibold text-lg'>{`${displayName} 님`}</p>
        <p className='text-lg'>{email}</p>
      </div>
    </div>
  );
};

export default Me;
