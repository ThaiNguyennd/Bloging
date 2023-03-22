import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Banner from "../components/layout/Banner";
import Layout from "../components/module/Layout";
import { db } from "../firebase/firebase-config";
import PostFeature from "../posts/PostFeature";
import PostNewfeed from "../posts/PostNewfeed";
import PostSimilar from "../posts/PostSimilar";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home page";
  });

  return (
    <div className="px-10">
      <Layout>
        <Banner></Banner>
        <PostFeature></PostFeature>
        <PostNewfeed></PostNewfeed>
        <PostSimilar></PostSimilar>
      </Layout>
    </div>
  );
};

export default HomePage;
