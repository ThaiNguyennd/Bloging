import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase-config";
import ActionDelete from "../action/ActionDelete";
import ActionEdit from "../action/ActionEdit";
import ActionView from "../action/ActionView";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import HeaderDashboard from "../module/dashboard/HeaderDashboard";
import SideBar from "../module/dashboard/SideBar";
import { categorystatus } from "../untils/Constant";

const CategoryManage = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const [fillter, setFillter] = useState("");
  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = fillter
      ? query(
          colRef,
          where("name", ">=", fillter),
          where("name", "<=", fillter + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(results);
    });
  }, [fillter]);
  const handleInputFilter = debounce((e) => {
    setFillter(e.target.value)
  }, 500);
  const handleDeletecategory = (docId) => {
    const colRef = doc(db, "categories", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className=" flex gap-10 ">
        <SideBar></SideBar>
        <div className="w-full mr-10">
          <div className="flex items-center justify-between">
            <DashboardHeading
              title="Categories"
              desc="Manage your category"
            ></DashboardHeading>
            <NavLink
              to={"/manage/category_addNew"}
              className="px-6 py-4 bg-orange-300 text-lg font-bold rounded-md text-blue-700 "
            >
              Add new category
            </NavLink>
          </div>
          <div className="mt-7 mb-10 float-right">
            <input
              type="text"
              placeholder="Search category"
              className="outline-none px-5 py-3 border border-gray-200 rounded-lg"
              onChange={handleInputFilter}
            />
          </div>
          <table className="mt-10 w-full table-auto">
            <thead className="bg-[#f7f7f8] rounded-lg">
              <tr>
                <th className="px-6 py-5">Id</th>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Slug</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {category?.length > 0 &&
                category?.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center pt-5 ">{item.id}</td>
                    <td className="text-center pt-5 ">{item.name}</td>
                    <td className="text-center pt-5 text-sm italic text-gray-400 ">
                      {item.slug}
                    </td>
                    {item.status === categorystatus.APPROVED && (
                      <td className="text-center pt-5 text-green-500 ">
                        Approved
                      </td>
                    )}
                    {item.status === categorystatus.UNAPPROVED && (
                      <td className="text-center pt-5 text-red-400 ">
                        UNApproved
                      </td>
                    )}

                    <td className="">
                      <div className="flex items-center justify-center gap-x-3 pt-5 ">
                        <ActionView></ActionView>
                        <ActionEdit
                          onClick={() =>
                            navigate(`/manage/update_category?id=${item.id}`)
                          }
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => handleDeletecategory(item.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManage;
