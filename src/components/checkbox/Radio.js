import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label >
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      {/* <div className="flex items-center gap-10"> */}
        {/* <div className="bg-gray-300 flex  w-full h-full"></div>
        <span>{children}</span> */}
      {/* </div> */}
      <div className="flex items-center gap-x-1 font-medium cursor-pointer">
        <div
          className={`w-5 h-7 rounded-full border flex items-center justify-center p-3  ${
            checked
              ? "bg-primary "
              : "border-black text-transparent"
          }`}
        >
        </div>
        <span className="mr-5">{children}</span>
      </div>
    </label>
  );
};

export default Radio;
