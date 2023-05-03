import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/Auth-context";
import { db } from "../../firebase/firebase-config";
import ActionDelete from "../action/ActionDelete";
import ActionEdit from "../action/ActionEdit";
import { roleStatus, usserStatus } from "../untils/Constant";

const UserTbale = () => {
  const { auth } = useAuth();
  const [fillter, setFillter] = useState("");
  const [userList, setUserList] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    function FetchUsser() {
      const colRef = collection(db, "users");
      const newRef = fillter
      ? query(
          colRef,
          where("fullName", ">=", fillter),
          where("fullName", "<=", fillter + "utf8")
        )
      : colRef;
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setUserList(result);
        });
      });
    }
    FetchUsser();
  }, [fillter]);
  const handleInputFilter = debounce((e) => {
    setFillter(e.target.value)
  }, 500);
  const userStatus = (status) => {
    switch (status) {
      case usserStatus.ACTIVE:
        return (
          <span className="px-2 py-1 bg-green-200 text-green-400 rounded-md">
            Active
          </span>
        );
      case usserStatus.PENDING:
        return (
          <span className="px-2 py-1 bg-green-200 text-orange-500-400 rounded-md">
            Pending
          </span>
        );
      case usserStatus.BAN:
        return (
          <span className="px-2 py-1 bg-green-200 text-red-600 rounded-md">
            Rejected
          </span>
        );

      default:
        break;
    }
  };
  const userRole = (status) => {
    switch (status) {
      case roleStatus.ADMIN:
        return <span>Admin</span>;
      case roleStatus.MOD:
        return <span>Mod</span>;
      case roleStatus.USER:
        return <span>User</span>;

      default:
        break;
    }
  };
  const handleDeletecategory = (docId) => {
    const colRef = doc(db, "users", docId);
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
  }
  return (
    <div>
      <div className="mt-5 mb-10 float-right">
        <div>
          <input
            type="text"
            placeholder="Search user"
            className="outline-none px-5 py-3 border border-gray-200 rounded-lg"
              onChange={handleInputFilter}
          />
        </div>
      </div>
      <table className="table-auto w-full mt-5">
        <thead className="bg-[#f7f7f8]">
          <tr>
            <th className="px-6 py-5">Id</th>
            <th className="px-6 py-5">InFo</th>
            <th className="px-6 py-5">User Name</th>
            <th className="px-6 py-5"> Email Address</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5">Role</th>
            <th className="px-6 py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList?.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td className="text-center pt-5 " title={user.id}>
                  {user.id.slice(0, 5) + "..."}
                </td>
                <td className="text-center justify-end pt-5 ">
                  <div className="flex justify-center">
                    <div>
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-12 w-12 object-cover rounded-md flex-shrink-0 mr-2"
                      />
                    </div>
                    <div className=" justify-start">
                      <h3 className="">{user.fullName}</h3>
                      <span className="font-light text-gray-400">
                        {new Date(
                          user?.createAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center pt-5 ">{user?.userName}</td>
                <td className="text-center pt-5 ">{user.email}</td>
                <td className="text-center pt-5 ">
                  {userStatus(Number(user?.status))}
                </td>

                <td className="text-center pt-5 ">
                  {userRole(Number(user?.role))}
                </td>
                <td className="text-center pt-5 ">
                  <div className="flex items-center justify-center gap-x-3 pt-5 ">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update_user?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletecategory(user.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTbale;
