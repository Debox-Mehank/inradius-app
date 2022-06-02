import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployerDashboardShownInterests = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Shown Interest" />
      <div className="overflow-y-auto dashboard-scroll"></div>
    </div>
  );
};

export default EmployerDashboardShownInterests;
