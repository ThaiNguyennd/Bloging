import React from "react";

const PostImage = ({ url, alt, className, Children }) => {
  return (
    <div className="">
        <img
          src={url}
          className={`w-full h-full object-cover rounded-lg  ${className}`}
          alt={alt}
        />
        {Children}
    </div>
  );
};

export default PostImage;
