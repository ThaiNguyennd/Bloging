import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestright = ({ data }) => {
  const [category, setCategory] = useState("");
  const [user, setuser] = useState("");
  useEffect(() => {
    async function fetch() {
      try {
        const colRef = doc(db, "categories", data.categoryId);
        const docSnap = await getDoc(colRef);
        setCategory(docSnap.data());
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [data.categoryId]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const colRef = doc(db, "user", data.userId);
        const docSnap = await getDoc(colRef);
        setuser(docSnap.data());
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [data.userId]);
  console.log(`category: ${category}`);
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <div className="w-1/2 bg-gray-300 rounded-xl h-auto">
      <div className="mt-8 flex items-center gap-6 ml-4">
        <div className="w-1/3 h-1/3">
          <PostImage url={data.image}></PostImage>
        </div>
        <div className="flex flex-col gap-y-4">
          {category?.name && (
            <PostCategory className=" bg-gray-200 px-3 py-1 rounded-lg text-primary">
              {category.name}
            </PostCategory>
          )}
          <PostTitle className="text-[#000] mt-3">{data.title}</PostTitle>
          <PostMeta
            authorName={data.author || data?.name}
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
