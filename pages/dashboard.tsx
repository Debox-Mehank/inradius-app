import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import DashboardLayout from "../components/dashboard/common/dashboard.layout.component";
import EmployeeDashboardExplore from "../components/dashboard/employee/employee.dashboard-explore.component";
import EmployeeDashboardMatched from "../components/dashboard/employee/employee.dashboard-matched.component";
import EmployeeDashboardMyInterests from "../components/dashboard/employee/employee.dashboard-my-interests.component";
import EmployeeDashboardProfile from "../components/dashboard/employee/employee.dashboard-profile.component";
import EmployeeDashboardShownInterests from "../components/dashboard/employee/employee.dashboard-shown-interests.component";
import EmployerDashboardExplore from "../components/dashboard/employer/employer.dashboard-explore.component";
import EmployerDashboardJobs from "../components/dashboard/employer/employer.dashboard-jobs.component";
import EmployerDashboardMatched from "../components/dashboard/employer/employer.dashboard-matched.component";
import EmployerDashboardMyInterests from "../components/dashboard/employer/employer.dashboard-my-interests.component";
import EmployerDashboardProfile from "../components/dashboard/employer/employer.dashboard-profile.component";
import EmployerDashboardShownInterests from "../components/dashboard/employer/employer.dashboard-shown-interests.component";
import AuthChecker from "../components/reusables/AuthChecker";
import { toggleLoading } from "../features/common.slice";
import {
  DashboardEmployeeState,
  DashboardEmployerState,
  DashboardPagesEnum,
  setCurrentPage,
  updateDashboardEmployeeData,
  updateDashboardEmployerData,
} from "../features/dashboard.sice";
import {
  useGetEmployeeLazyQuery,
  useGetEmployerLazyQuery,
  User,
  UserRole,
} from "../generated/graphql";

const Dashboard = () => {
  const router = useRouter();
  const { page } = router.query;

  const [getEmployerQuery] = useGetEmployerLazyQuery();
  const [getEmployeeQuery] = useGetEmployeeLazyQuery();

  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const user = useSelector((state: RootState) => state.dashboard.dashboardUser);

  useEffect(() => {
    const fetchUser = async () => {};

    const fetchEmployee = async () => {
      dispatch(toggleLoading());
      const { data: employeeData, error: employeeError } =
        await getEmployeeQuery();
      if (employeeError !== undefined) {
        toast.error(employeeError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (employeeData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      dispatch(toggleLoading());

      const employee = employeeData.getEmployee;

      const empData: DashboardEmployeeState = {
        _id: employee._id,
        radius: employee.radius ?? 0,
        location: employee.location?.location ?? "",
        qualification: employee.qualification?.qualification ?? "",
        industry: employee.industry?.industry ?? "",
        domain: employee.industry?.industry ?? "",
        subDomain: employee.subDomain.map((el) => el.subDomain),
        skills: employee.skills.map((el) => el.skill),
        fresher: employee.fresher ?? false,
        workExp: employee.workExp.map((el) => ({
          company: el.company,
          current: el.current,
          desc: el.desc,
          designation: el.designation,
          end: el.end,
          start: el.start,
        })),
        totalExp: `${employee.totalExp?.years ?? ""} year ${
          employee.totalExp?.months ?? ""
        } months`,
        relevantExp: `${employee.relevantExp?.years ?? ""} year ${
          employee.relevantExp?.months ?? ""
        } months`,
        currentPay: employee.currentPay ?? 0,
        expectedPay: employee.expectedPay ?? 0,
        linkedIn: employee.linkedIn ?? "",
        resume: employee.resume ?? "",
        gender: employee.gender,
        currentAddress: "",
        dob: employee.dob,
        panCard: employee.panCard ?? "",
        aadharCard: employee.aadharCard ?? "",
      };

      dispatch(updateDashboardEmployeeData(empData));
    };

    const fetchEmployer = async () => {
      dispatch(toggleLoading());
      const { data: employerData, error: employerError } =
        await getEmployerQuery();
      if (employerError !== undefined) {
        toast.error(employerError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (employerData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      dispatch(toggleLoading());

      const employer = employerData.getEmployer;

      if (!employer.employerVerified) {
        toast.error("Something went wrong, try again later.", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      const empData: DashboardEmployerState = {
        companyName: employer.companyName,
        companyImage: employer.companyImage,
        jobs: (employer.jobs ?? []).map((job) => ({
          _id: job._id,
          jobTitle: job.jobTitle,
          jobDesc: job.jobDesc,
          jobStatus: job.jobStatus,
          jobType: job.jobType ? { label: "", value: job.jobType } : null,
          listingComplete: job.listingComplete,
          location: job.location,
          radius: job.radius,
          latitude: job.latitude,
          longitude: job.longitude,
          qualification: job.qualification,
          industry: job.industry,
          domain: job.domain,
          subDomain: job.subDomain ? job.subDomain.map((sd) => ({
            _id: sd._id,
            subDomain: sd.subDomain,
          })) : [],
          skills: job.skills.map((s) => ({
            label: s.skill,
            value: s._id,
          })),
          minRequiredExp: job.minRequiredExp
            ? {
                years: {
                  label: job.minRequiredExp?.years ?? "",
                  value: job.minRequiredExp?.years ?? "",
                },
                months: {
                  label: job.minRequiredExp?.months ?? "",
                  value: job.minRequiredExp?.months ?? "",
                },
              }
            : null,
          minPay: job.minPay,
          maxPay: job.maxPay,
        })),
      };

      dispatch(updateDashboardEmployerData(empData));
    };

    if (user) {
      if (user.type === UserRole.Employee) {
        // Fetch Employee
        fetchEmployee();
      }

      if (user.type === UserRole.Employer) {
        // Fetch Employer
        fetchEmployer();
      }
    }
  }, [dispatch, getEmployerQuery, getEmployeeQuery, user]);

  useEffect(() => {
    if (page) {
      dispatch(
        setCurrentPage(
          page === DashboardPagesEnum.explore
            ? DashboardPagesEnum.explore
            : page === DashboardPagesEnum["my-interests"]
            ? DashboardPagesEnum["my-interests"]
            : page === DashboardPagesEnum["shown-interests"]
            ? DashboardPagesEnum["shown-interests"]
            : page === DashboardPagesEnum.matched
            ? DashboardPagesEnum.matched
            : page === DashboardPagesEnum.profile
            ? DashboardPagesEnum.profile
            : page === DashboardPagesEnum.jobs
            ? DashboardPagesEnum.jobs
            : DashboardPagesEnum.explore
        )
      );
    }
    // router.replace("/dashboard?page=explore");
    // eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <AuthChecker page="dashboard">
      <DashboardLayout>
        {page && page === DashboardPagesEnum.explore && (
          <>
            {user?.type === UserRole.Employee ? (
              <EmployeeDashboardExplore />
            ) : (
              <EmployerDashboardExplore />
            )}
          </>
        )}
        {page && page === DashboardPagesEnum["my-interests"] && (
          <>
            {user?.type === UserRole.Employee ? (
              <EmployeeDashboardMyInterests />
            ) : (
              <EmployerDashboardMyInterests />
            )}
          </>
        )}
        {page && page === DashboardPagesEnum["shown-interests"] && (
          <>
            {user?.type === UserRole.Employee ? (
              <EmployeeDashboardShownInterests />
            ) : (
              <EmployerDashboardShownInterests />
            )}
          </>
        )}
        {page && page === DashboardPagesEnum["matched"] && (
          <>
            {user?.type === UserRole.Employee ? (
              <EmployeeDashboardMatched />
            ) : (
              <EmployerDashboardMatched />
            )}
          </>
        )}
        {page && page === DashboardPagesEnum["profile"] && (
          <>
            {user?.type === UserRole.Employee ? (
              <EmployeeDashboardProfile />
            ) : (
              <EmployerDashboardProfile />
            )}
          </>
        )}
        {page && page === DashboardPagesEnum.jobs && <EmployerDashboardJobs />}
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Dashboard;
