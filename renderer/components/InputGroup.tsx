import React, { ChangeEvent } from "react";

interface InputProp {
  type: string;
  value: string;
  setValue: (str: string) => void;
  placeholder?: string;
  error: string;
}
const InputGroup = ({
  type,
  value,
  setValue,
  placeholder,
  error,
}: InputProp) => {
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='pb-4'>
      <input
        className='border rounded p-3 w-full'
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleOnchange}
      />
      <p className='text-red-500 text-sm'>{error}</p>
    </div>
  );
};

export default InputGroup;
