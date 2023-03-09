import React from "react";
import PostHeading from "./PostHeading";
import PostNewestright from "./PostNewestright";
import PostNewstleft from "./PostNewstleft";
import PostSimilar from "./PostSimilar";

const PostNewfeed = () => {
  return (
    <div className="mt-[50px] mb-10">
      <PostHeading>New Feed</PostHeading>
      <div className="flex gap-x-10 w-full mt-10 ">
        <PostNewstleft></PostNewstleft>
        <PostNewestright></PostNewestright>
      </div>
    </div>
  );
};

export default PostNewfeed;
