import React from "react";

const Lable = ({
  htmlFor = "",
  children,
  className = "",
  ...props
}) => {
  return (
    <label htmlFor={htmlFor} className={`${className} font-semibold  text-xl mb-2 cursor-pointer `} {...props}>
      {" "}
      {children}
    </label>
  );
};

export default Lable;
