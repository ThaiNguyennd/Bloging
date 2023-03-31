import React from "react";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import HeaderDashboard from "../module/dashboard/HeaderDashboard";
import SideBar from "../module/dashboard/SideBar";
import UserTbale from "./UserTbale";

const UserManage = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-10">
        <SideBar></SideBar>
        <div className="w-full mr-10">
          <DashboardHeading
            title="User manage"
            desc="Manage your user"
          ></DashboardHeading>
          <UserTbale></UserTbale>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
