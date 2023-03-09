import React from "react";
import { NavLink } from "react-router-dom";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";

const PostPage = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex  ">
        <ul className="bg-slate-300 w-full max-w-[500px] mt-5 rounded-2xl shadow-2xl ">
          <SideBar></SideBar>
        </ul>
        <div className="flex flex-col gap-10 ml-10">
          <h2 className=" mt-10 text-5xl text-primary font-bold mx-5">Post</h2>
       
        </div>
      </div>
    </div>
  );
};

export default PostPage;
