import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
interface Textarea {
  value: string;
  setValue: (value: string) => void;
  rows: number;
  onKeyDown: () => Promise<void>;
}

const Textarea = ({ value, setValue, rows, onKeyDown }: Textarea) => {
  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      onKeyDown();
    }
  };

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <>
      <textarea
        className='w-full p-2 absloute border resize-none rounded-md mb-1'
        onChange={onChangeHandler}
        onKeyDown={onEnterPress}
        value={value}
        rows={rows}
      />
    </>
  );
};

export default Textarea;
