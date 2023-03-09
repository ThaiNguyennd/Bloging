import React from "react";

const PostTitle = ({children,className="font-semibold leading-7 text-xl mr-3 mt-5 mb-[10px]  "}) => {
  return (
      <span className={className}>{children}</span>
    
  );
};

export default PostTitle;
