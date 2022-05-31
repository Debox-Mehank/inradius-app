import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import DashboardLayout from "../components/dashboard/common/dashboard.layout.component";
import EmployeeDashboardExplore from "../components/dashboard/employee/employee.dashboard-explore.component";
import EmployerDashboardExplore from "../components/dashboard/employer/employer.dashboard-explore.component";
import EmployerDashboardJobs from "../components/dashboard/employer/employer.dashboard-jobs.component";
import EmployerDashboardMyInterests from "../components/dashboard/employer/employer.dashboard-my-interests.component";
import { toggleLoading } from "../features/common.slice";
import { DashboardPagesEnum, setCurrentPage } from "../features/dashboard.sice";
import { useGetEmployerLazyQuery, User, UserRole } from "../generated/graphql";

const Dashboard = () => {
  const router = useRouter();
  const { page } = router.query;

  const [getEmployerQuery] = useGetEmployerLazyQuery();

  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {};

    const fetchEmployee = async () => {};

    const fetchEmployer = async () => {
      dispatch(toggleLoading());
      const { data: employerData, error: employerError } =
        await getEmployerQuery();
      if (employerError !== undefined) {
        toast.error(employerError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      if (employerData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      dispatch(toggleLoading());
      console.log(employerData.getEmployer);
    };

    if (localStorage.getItem("user")) {
      const myUser: User = JSON.parse(localStorage.getItem("user")!);
      setUser(myUser);

      if (myUser.type === UserRole.Employee) {
        // Fetch Employee
      }

      if (myUser.type === UserRole.Employer) {
        // Fetch Employer
        fetchEmployer();
      }
    }
  }, [dispatch, getEmployerQuery]);

  useEffect(() => {
    dispatch(setCurrentPage(DashboardPagesEnum.explore));
    router.replace("/dashboard?page=explore");
    // eslint-disable-next-line
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout user={user}>
      {page && page === DashboardPagesEnum.explore && (
        <>
          {user.type === UserRole.Employee ? (
            <EmployeeDashboardExplore />
          ) : (
            <EmployerDashboardExplore />
          )}
        </>
      )}
      {page && page === DashboardPagesEnum["my-interests"] && (
        <>
          {user.type === UserRole.Employee ? (
            <EmployeeDashboardExplore />
          ) : (
            <EmployerDashboardMyInterests />
          )}
        </>
      )}
      {page && page === DashboardPagesEnum.jobs && <EmployerDashboardJobs />}
    </DashboardLayout>
  );
};

export default Dashboard;
