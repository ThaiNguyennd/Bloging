import React from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestright = () => {
  return (
    <div className="w-1/2 bg-gray-300 rounded-xl h-auto">
      <div className="mt-8 flex items-center gap-6 ml-4">
        <div className="w-1/3 h-1/3">
          <PostImage url='https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'></PostImage>
        </div>
        <div>
          <PostCategory>Kiến Thức</PostCategory>
          <PostTitle>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
         <PostMeta></PostMeta>
        </div>
      </div>
      <div className="w-full mx-5 h-[1px] bg-white mt-3"></div>
     
    </div>
  );
};

export default PostNewestright;
