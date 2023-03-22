import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItem = ({ data }) => {
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
    <div className="w-full h-[350px] relative rounded-xl mt-3">
      <PostImage
        className={`w-full h-full object-cover absolute z-0`}
        url={data.image}
      ></PostImage>
      <div className="z-20 flex flex-col absolute gap-y-5 w-full ">
        <div className="flex items-center justify-between p-3 gap-x-10  text-white  ">
          {category?.name && (
            <PostCategory className="ml-3 bg-gray-200 px-3 py-1 rounded-lg text-primary">
              {category.name}
            </PostCategory>
          )}
          <PostMeta
            authorName={data.author || user?.name}
            date={formatDate}
            className=" "
          ></PostMeta>
        </div>
        <div className=" p-3 mt-5 ml-3 w-full ">
          <PostTitle>{data.title}</PostTitle>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
