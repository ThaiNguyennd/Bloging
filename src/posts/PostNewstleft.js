import React, { Fragment } from "react";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewstleft = () => {
  return (
    <div className="mb-10 w-1/2">
      <div className=" h-[533px] mb-6">
        <img
          src="https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <PostCategory>Kiến thức</PostCategory>
      <div className='my-3'>
        <PostTitle>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
      </div>
      <PostMeta></PostMeta>
    </div>
  );
};

export default PostNewstleft;
