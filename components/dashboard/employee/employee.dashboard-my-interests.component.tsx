import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardMyInterests = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="My Interests" />
      <div className="overflow-y-auto dashboard-scroll"></div>
    </div>
  );
};

export default EmployeeDashboardMyInterests;
