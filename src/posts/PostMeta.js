import React from "react";

const PostMeta = ({ date='mar 23',author=" thai" ,className }) => {
  return (
    <div>
      <div className="flex gap-7 font-light text-sm align-middle">
        <span className={className}>{date}</span>
        <svg
          className="align-middle mt-2"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#B1B5C3" />
        </svg>
        <span className={className}>{author}</span>
      </div>
    </div>
  );
};

export default PostMeta;
