import React from "react";
import PostCategory from "./PostCategory";
import PostHeading from "./PostHeading";
import PostItem from "./PostItem";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostFeature = () => {
  return (
    <div className="mt-20">
      <PostHeading>Feature</PostHeading>
      <div className=" grid grid-cols-4 mx-auto gap-8">
        <PostItem></PostItem>
      </div>
    </div>
  );
};

export default PostFeature;
