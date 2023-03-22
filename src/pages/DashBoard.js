import React from "react";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";

const DashBoard = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-x-10">
        <SideBar></SideBar>
        <h2 className="text-4xl font-bold text-primary mt-10  ">
          Manage DashBoard
        </h2>
      </div>
    </div>
  );
};

export default DashBoard;
