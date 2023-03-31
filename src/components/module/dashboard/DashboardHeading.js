import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10 mt-10 flex items-start justify-between text-primary">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-base font-normal">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
