import React, { ChangeEvent, useCallback } from "react";

interface InputProp {
  type: string;
  value: string;
  error?: string;
  className?: string;
  setValue: (str: string) => void;
  placeholder?: string;
}
const TextInput = ({
  type,
  value,
  error,
  className,
  setValue,
  placeholder,
}: InputProp) => {
  const handleOnchange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleOnchange}
      />
      <p className='text-red-500 text-sm'>{error}</p>
    </>
  );
};

export default TextInput;
