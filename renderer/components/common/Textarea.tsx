import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
import { IoMdSend } from "react-icons/io";

interface Textarea {
  value: string;
  setValue: (value: string) => void;
  rows: number;
  sendHandler: () => Promise<void>;
}

const Textarea = ({ value, setValue, rows, sendHandler }: Textarea) => {
  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false && value.trim()) {
      sendHandler();
    }
  };

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <div className='relative'>
      <textarea
        className='w-full p-2 absloute border resize-none rounded-md mb-1'
        onChange={onChangeHandler}
        onKeyDown={onEnterPress}
        value={value}
        rows={rows}
      />
      <button
        onClick={sendHandler}
        className='absolute'
        disabled={!value.trim() ? true : false}
      >
        <IoMdSend
          size={28}
          className={`messageSendIcon ${
            !value.trim() ? "text-gray-200" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

export default Textarea;
