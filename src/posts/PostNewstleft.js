import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewstleft = ({ data }) => {
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
    <div className="mb-10 w-1/2">
      <div>
        <div className=" h-[533px] mb-6">
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {category?.name && (
          <PostCategory className="ml-3 bg-gray-200 px-3 py-1 rounded-lg text-primary">
            {category.name}
          </PostCategory>
        )}
        <div className="my-3 ">
          <PostTitle className="text-black mt-3">{data.title}</PostTitle>
        </div>
        <PostMeta
          authorName={data.author || data?.name}
          date={formatDate}
          className="text-[#000] justify-start"
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewstleft;
