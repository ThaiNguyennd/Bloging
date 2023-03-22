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
import PostNewestright from "./PostNewestright";
import PostNewstleft from "./PostNewstleft";
import PostSimilar from "./PostSimilar";

const PostNewfeed = () => {
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
  if (posts.length <= 0) return null;
  return (
    <div className="mt-[50px] mb-10">
      <PostHeading>New Feed</PostHeading>

      {posts.map((post) => (
        <div className="flex gap-x-10 w-full mt-10">
          <PostNewstleft key={post.id} data={post}></PostNewstleft>
          <PostNewestright key={post.id} data={post}></PostNewestright>
        </div>
      ))}
    </div>
  );
};

export default PostNewfeed;
