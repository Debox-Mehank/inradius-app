import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployerDashboardMyInterests = () => {
  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="My Interests" />
      <div className="overflow-y-auto dashboard-scroll">
        <div className="bg-red-500 h-96">H</div>
        <div className="bg-blue-500 h-96">H</div>
        <div className="bg-yellow-500 h-96">H</div>
      </div>
    </div>
  );
};

export default EmployerDashboardMyInterests;
