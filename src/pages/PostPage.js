import React from "react";
import ActionDelete from "../components/action/ActionDelete";
import ActionEdit from "../components/action/ActionEdit";
import ActionView from "../components/action/ActionView";
import Button from "../components/button/Button";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";

const PostPage = () => {
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-20">
        <SideBar></SideBar>
        <div className="w-full">
          <h2 className="text-4xl font-bold mt-10 text-primary">Manage Post</h2>
          <input
            type="text"
            placeholder="Search Post"
            className="inline-block outline-none px-10 py-3 border border-gray-300 float-right mr-20 rounded-lg mt-7"
          />
          <table className="mt-40 w-full ">
            <thead className="bg-[#f7f7f8] rounded-lg">
              <tr>
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5 text-left">Post</th>
                <th className="px-6 py-5 text-left">category</th>
                <th className="px-6 py-5 text-left">Author</th>
                <th className="px-6 py-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center p-3">01</td>
                <td>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-[50px] h-[50px]">
                      <img
                        src="https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                        alt=""
                        className="w-full h-full object-cover rounded-lg "
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3>One special 4k camera</h3>
                      <span>Date:25oct 2022</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 ">Camera gerrr</td>
                <td className="p-3 ">Nguyễn thái</td>
                <td>
                  <div className="flex items-center gap-x-3 rounded-md">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete></ActionDelete>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Button className="mx-auto">Load More</Button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
