import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  DashboardPagesEnum,
  DashboardSidebarList,
} from "../../../features/dashboard.sice";
import { User, UserRole } from "../../../generated/graphql";
import DashboardFilter from "./dashboard.filter.component";
import DashboardSidebar from "./dashboard.sidebar.component";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const user = useSelector((state: RootState) => state.dashboard.dashboardUser);

  return (
    <div className="w-full h-full grid grid-cols-10 overflow-hidden">
      <DashboardSidebar
        list={
          user && user.type === UserRole.Employer
            ? DashboardSidebarList.employer
            : DashboardSidebarList.employee
        }
      />
      <div
        className={`w-full h-full relative ${
          currentPage === DashboardPagesEnum.explore
            ? "col-span-6"
            : "col-span-8"
        }`}
      >
        {children}
      </div>

      {currentPage === DashboardPagesEnum.explore && user && (
        <DashboardFilter />
      )}

      {/* Bg */}
      <div className="w-full h-full bg-cover bg-center absolute top-0 left-0 right-0 bottom-0 reg-bg opacity-10 -z-10"></div>
    </div>
  );
};

export default DashboardLayout;
