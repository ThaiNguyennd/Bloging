import React from "react";
import { NavLink } from "react-router-dom";

const HeaderDashboard = () => {
  return (
    <div className="w-full h-[90px] bg-gray-50 shadow-lg ">
      <div className="flex items-center justify-between">
        <NavLink to={"/"}>
          <div className="flex items-center gap-x-4">
            <div className="h-[70px] w-[70px] ml-20 mt-3">
              <img
                src="/logo.png"
                alt=""
                className="w-full h-full object-cover "
              />
            </div>
            <h2 className="text-3xl font-semibold text-primary">
              Chicken Blogging
            </h2>
          </div>
        </NavLink>
        <div className="float-right mr-14 items-center my-auto mt-5  gap-4 flex justify-center">
          <NavLink
            to={"/manage/add_post"}
            className="px-6 py-3 bg-primary text-lg font-semibold rounded-md "
          >
            Write new post
          </NavLink>
          <div className="w-[50px] h-[50px] rounded-full">
            <img src="/user.png" alt=""  className="w-full h-full object-cover "/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
