interface DashboardPageHeadingProps {
  title: string;
}
const DashboardPageHeading = ({ title }: DashboardPageHeadingProps) => {
  return (
    <h4 className="text-darkGray font-bold text-xl xl:text-3xl pb-6 pt-6">
      {title}
    </h4>
  );
};

export default DashboardPageHeading;
