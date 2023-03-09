import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../button/Button';

const HeaderDashboard = () => {
    return (
        <div className="w-full h-[90px] bg-gray-50 shadow-lg ">
      <div className="float-right mr-14 items-center my-auto mt-5  gap-4 flex justify-center">
              <NavLink to={"/manage/add_post"} className="px-6 py-2 bg-primary text-lg font-semibold rounded-md ">Write new post</NavLink> 
              <div className="w-[50px] h-[50px] rounded-full bg-slate-500"></div>
      </div>
    </div>
    );
};

export default HeaderDashboard;