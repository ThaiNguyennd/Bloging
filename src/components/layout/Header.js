import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useAuth } from "../../contexts/Auth-context";

const mneuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <div className="flex items-center justify-between w-full  max-w-[1240px] mx-auto h-[80px] mt-5">
      <div className="flex ">
        <NavLink to={"/"}>
          <img
            src="/logo.png"
            alt=""
            className="w-[80px] h-full object-cover mr-8"
          />
        </NavLink>
        <ul className="flex items-center justify-center">
          {mneuLinks.map((item) => (
            <li className="mr-10" key={item.title}>
              <NavLink to={item.url}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center px-14">
        <div className="flex border border-gray-400 px-5 py-3 rounded-lg">
          <input
            type="text"
            placeholder="search ports ... "
            className="outline-none"
          />
          <span className="items-center">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        {!userInfo ? (
          <Button
            to="/sign-in"
            className="ml-3  bg-primary px-8 py-3 rounded-lg"
          >
            Login
          </Button>
        ) : (
            <NavLink to={"/dashboard"} className="ml-8">
              <div className="w-[50px] h-[50px] rounded-full bg-slate-400"></div>
            
            </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
