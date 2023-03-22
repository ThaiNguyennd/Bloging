import React from "react";
import HeaderDashboard from "./HeaderDashboard";
import SideBar from "./SideBar";

const Layoutmange = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="float-left w-[25%] rounded-lg mt-5 shadow-lg bg-gray-300 mr-10">
        <SideBar></SideBar>
      </div>
    </div>
  );
};

export default Layoutmange;
