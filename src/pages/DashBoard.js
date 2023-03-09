import React from "react";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";

const DashBoard = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex  ">
        <ul className="bg-slate-300 w-full max-w-[500px] mt-5 rounded-2xl shadow-2xl ">
          <SideBar></SideBar>
        </ul>
        <h2  className=" mt-10 text-5xl text-primary font-bold mx-5">Manage DashBoard</h2>
      </div>
    </div>
  );
};

export default DashBoard;
