import React from "react";

const PostMeta = ({
  to = "",
  className = "",
  authorName = "thainguyen",
  date = "13 mar",
}) => {
  return (
    <div>
      <div
        className={`${className} font-semibold leading-7 text-3xl mr-3 mt-5 mb-[10px] flex items-center  text-white`}
      >
        <span className="text-sm">{date}</span>
        <svg
          className="mx-3"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#B1B5C3" />
        </svg>
        <span className="text-sm">{authorName}</span>
      </div>
    </div>
  );
};

export default PostMeta;
