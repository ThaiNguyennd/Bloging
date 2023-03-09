import React from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostSimilar = () => {
  return (
    <div className="mb-10 grid grid-cols-4 w-full gap-7 mt-10">
      <div>
        <div className=" h-[230px] mb-10">
         <PostImage url='https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'></PostImage>
        </div>
        <PostCategory>Kiến Thức</PostCategory>
        <div className="my-3">
          <PostTitle>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
       </div>
        <PostMeta></PostMeta>
      </div>
    </div>
  );
};

export default PostSimilar;
