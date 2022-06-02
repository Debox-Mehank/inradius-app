import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardProfile = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="My Profile" />
      <div className="overflow-y-auto dashboard-scroll"></div>
    </div>
  );
};

export default EmployeeDashboardProfile;
