import React from "react";

interface TitleProp {
  title: string;
}
const Title = ({ title }: TitleProp) => {
  return <nav className='p-3 border-b border-b-gray-300'>{title}</nav>;
};

export default Title;
