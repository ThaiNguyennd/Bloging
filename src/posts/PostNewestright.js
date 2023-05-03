import { collection, doc, getDoc, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestright = ({ data }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const quries = query(
      colref,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(quries, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setPosts(result);

      });
    });
  }, []);
 
  if (!data || !data.id) return null;
  const date = posts?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <div className="w-1/2 bg-gray-300 rounded-xl h-auto">
      <div className="mt-8 flex items-center gap-6 ml-4">
        <div className="w-1/3 h-1/3">
          <PostImage url={posts.image}></PostImage>
        </div>
        <div className="flex flex-col gap-y-4">
          {posts?.category?.name && (
            <PostCategory className=" bg-gray-200 px-3 py-1 rounded-lg text-primary">
              {posts?.category?.name}
            </PostCategory>
          )}
          <PostTitle className="text-[#000] mt-3">{data.title}</PostTitle>
          <PostMeta
            authorName={posts?.user?.name}
            date={formatDate}
            className="text-[#000] justify-start"
          ></PostMeta>
        </div>
      </div>
      <div className="w-full mx-5 h-[1px] bg-white mt-3"></div>
    </div>
  );
};

export default PostNewestright;
