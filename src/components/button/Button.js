/* eslint-disable no-undef */
import React from "react";
import { NavLink } from "react-router-dom";
// ${disabled ?"opacity-50 pointer-events-none":""}
const Button = ({
  isSubmiting,
  className = ``,
  to,
  type = "button",
  children,
  onClick = () => {},
  ...props
}) => {
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <button
          className={`${className} px-9  py-3 text-center bg-primary rounded-xl mx-auto font-semibold ${
            isSubmiting ? "opacity-50 pointer-events-none" : ""
          } `}
          type="type"
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      </NavLink>
    );
  }
  return (
    <button className={className} type="type" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
