import React, { ChangeEvent, useCallback } from "react";
import { InputProp } from "../types/TextInput";

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
    <div className='pb-4'>
      <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleOnchange}
      />
      <p className='text-red-500 text-sm'>{error}</p>
    </div>
  );
};

export default TextInput;
