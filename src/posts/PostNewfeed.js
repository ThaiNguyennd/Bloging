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
  
  return (
    <div className="mt-[50px] mb-10">
      <PostHeading>New Feed</PostHeading>

        <div className="flex gap-x-10 w-full mt-10">
          <PostNewstleft></PostNewstleft>
          <PostNewestright></PostNewestright>
        </div>
    </div>
  );
};

export default PostNewfeed;
