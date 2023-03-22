import React from "react";

const PostTitle = ({ children, className = " " }) => {
  return (
    <span
      className={`${className} font-semibold leading-7 text-3xl mr-3 mt-5 mb-[10px] text-white`}
    >
      {children}
    </span>
  );
};

export default PostTitle;
