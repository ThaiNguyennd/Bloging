import React from "react";

const Lable = ({
  htmlFor = "",
  children,
  className = "text-semibold text-xl mb-4 cursor-pointer",
  ...props
}) => {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {" "}
      {children}
    </label>
  );
};

export default Lable;
