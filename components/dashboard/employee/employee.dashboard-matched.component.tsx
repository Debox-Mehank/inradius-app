import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardMatched = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Matched" />
      <div className="overflow-y-auto dashboard-scroll"></div>
    </div>
  );
};

export default EmployeeDashboardMatched;
