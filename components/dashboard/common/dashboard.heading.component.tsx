interface DashboardPageHeadingProps {
  title: string;
}
const DashboardPageHeading = ({ title }: DashboardPageHeadingProps) => {
  return (
    <h4 className="text-darkGray font-bold text-2xl pb-6 pt-6">{title}</h4>
  );
};

export default DashboardPageHeading;
