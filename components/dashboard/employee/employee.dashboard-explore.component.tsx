import React from "react";
import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardExplore = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Explore Jobs Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        <div className="bg-red-500 h-96">H</div>
        <div className="bg-blue-500 h-96">H</div>
        <div className="bg-yellow-500 h-96">H</div>
      </div>
    </div>
  );
};

export default EmployeeDashboardExplore;