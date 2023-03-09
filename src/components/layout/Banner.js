import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
  return (
    <div className="w-full  mx-auto bg-primary h-[500px] mt-9 rounded-lg flex items-center justify-between text-slate-700 ">
      <div className="flex flex-col items-start justify-between gap-20 ml-14                ">
        <h1 className="font-bold text-4xl">Chicken Blogging</h1>
        <p className="w-[730px] leading-8  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sequi
          amet veritatis nam doloremque quisquam repellat. Eius incidunt fugit
          facere suscipit, nisi, minima ab harum reiciendis dolores
          necessitatibus iusto non.
        </p>
        <NavLink to={"/sign-up"} className="bg-white px-6 py-4 rounded-xl">Get started</NavLink>
      </div>
      <button to={"/sign-up"} className="pr-7 ">
        <img src="/banner.png" alt="" />
      </button>
    </div>
  );
};

export default Banner;
