import React from 'react';
import PostCategory from './PostCategory';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostItem = () => {
    return (
        <div className="bg-feature w-full h-[250px] rounded-xl mt-12">
        <div className="flex items-center justify-between p-3   ">
          <PostCategory className="ml-7">Kiến thức</PostCategory>
          <PostMeta className="text-white"></PostMeta>
        </div>
        <div className=" p-3">
          <PostTitle>
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </PostTitle>
        </div>
      </div>
    );
};

export default PostItem;