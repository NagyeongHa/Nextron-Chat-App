import React from "react";

interface TitleProp {
  title: string;
}
const Title = ({ title }: TitleProp) => {
  return (
    <nav className='py-5 px-9 mt-5 text-xl  border-b-gray-300'>{title}</nav>
  );
};

export default Title;
