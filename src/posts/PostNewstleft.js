import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewstleft = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const quries = query(
      colref,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(1)
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

  const postImage = posts?.image
  console.log(postImage)
  const date = posts?.createdAt?.seconds
    ? new Date(posts?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (posts.length <= 0) return null;
  return (
    <div className="mb-10 w-1/2">
      <div>
        <div className=" h-[533px] mb-6">
          <img
            src={posts.image}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {posts?.category?.name && (
          <PostCategory className="ml-3 bg-gray-200 px-3 py-1 rounded-lg text-primary">
            {posts?.category?.name}
          </PostCategory>
        )}
        <div className="my-3 ">
          <PostTitle className="text-black mt-3">{posts.title}</PostTitle>
        </div>
        <PostMeta
          authorName={posts?.user?.fullName}
          date={formatDate}
          className="text-black justify-start"
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewstleft;
