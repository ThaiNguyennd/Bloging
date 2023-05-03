import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SideBar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to sign out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            console.log("succes");
            navigate("/");
          })
          .catch((error) => {
            console.log(error.messeage);
          });
        Swal.fire("SignOuted", "you have successfully logged out", "success");
      }
    });
  };
  const sidebarLinks = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: "Post",
      url: "/manage/posts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Category",
      url: "/manage/category",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
    {
      title: "User",
      url: "/manage/user",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Logout",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      onClick: () => handleSignOut(),
    },
  ];
  return (
    <div className="flex items-center flex-col gap-20 bg-gray-300 rounded-lg w-[25%] h-[75%] shadow-lg mt-5">
      {sidebarLinks.map((link) => {
        if (link.onClick) {
          return (
            <div
              onClick={link?.onClick}
              key={link.title}
              className="mb-5 flex text-2xl gap-5 cursor-pointer w-full font-bold ml-20"
            >
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </div>
          );
        }
        return (
          <NavLink
            to={link.url}
            // flex text-2xl gap-5 cursor-pointer mt-5 w-full ml-20 font-semibold
            className={({ isActive }) =>
              isActive
                ? " bg-primary text-green-500  text-2xl  cursor-pointer pt-5  w-full py-3  rounded-lg font-semibold rouned-md "
                : "flex text-2xl gap-5 cursor-pointer pt-5 w-full py-3 font-semibold"
            }
            key={link.title}
          >
            <div className="flex ml-10">
              <span className="menu-icon mr-5">{link.icon}</span>
              <span className="menu-text ">{link.title}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SideBar;
