import React from "react";

const Logo = () => {
  return (
    <div className="w-full h-full text-center items-center mb-16 ">
      <div className="max-w-[160px] h-[120px] mx-auto">
        <img
          srcSet="/logo.png 2x"
          alt="chicken-blogging"
          className=" w-full h-full "
        />
      </div>
      <h1 className="text-5xl block font-bold mt-2 text-primary">
        Chicken blogging
      </h1>
    </div>
  );
};

export default Logo;
