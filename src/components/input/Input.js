import React, { Fragment } from "react";
import { useController } from "react-hook-form";

const Input = ({ name = "", type = "text", children ,className ="bg-gray-200 w-full p-4 rounded-lg border outline-none focus:border-blue-500 focus:bg-slate-100 transition-all mt-3", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <Fragment>
      <input
        type={type}
        id={name}
        className={className}
        {...field}
        {...props}
      />
      {children}
    </Fragment>
  );
};

export default Input;
