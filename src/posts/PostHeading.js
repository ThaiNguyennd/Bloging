import React from "react";

const PostHeading = ({ children,className="mt-2 text-3xl font-medium" }) => {
  return (
    <div>
      <div className="w-[35px] h-[3px] bg-[#cc6633]"></div>
      <h2 className={className} >{children}</h2>
    </div>
  );
};

export default PostHeading;
