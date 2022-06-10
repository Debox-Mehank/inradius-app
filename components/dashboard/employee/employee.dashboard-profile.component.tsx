import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardProfile = () => {
  const dashboardEmployee = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee
  );
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="My Profile" />
      <div className="overflow-y-auto dashboard-scroll break-words">
        {JSON.stringify(dashboardEmployee)}
      </div>
    </div>
  );
};

export default EmployeeDashboardProfile;
