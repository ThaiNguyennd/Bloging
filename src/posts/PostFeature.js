import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import PostHeading from "./PostHeading";
import PostItem from "./PostItem";
 
const PostFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const quries = query(
      colref,
      where("status", "==", 1),
      where("hot", "==", true),
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
  if (posts.length <= 0) return null;
  return (
    <div className="mt-20">
      <PostHeading>Feature</PostHeading>
      <div className=" grid grid-cols-3 mx-auto gap-8">
        {posts.map((post) => (
          <PostItem key={post.id} data={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostFeature;
