import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import {
  DashboardEmployee,
  DashboardEmployer,
  useEmployeeExploreLazyQuery,
  useEmployerExploreLazyQuery,
} from "../../../generated/graphql";
import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployerDashboardExplore = () => {
  const dispatch = useDispatch();

  const jobs = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.jobs
  );

  const [empList, setEmpLists] = useState<DashboardEmployee[]>([]);
  const [employerExploreQuery] = useEmployerExploreLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      if (jobs && jobs.length > 0) {
        dispatch(toggleLoading());
        const { data, error } = await employerExploreQuery({
          variables: { jobId: jobs[0]._id! },
        });
        dispatch(toggleLoading());
        if (error !== undefined) {
          toast.error(error.message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        if (!data) {
          toast.error("Something went wrong!", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        const sorted = data.employerExplore.sort(
          (a: DashboardEmployee, b: DashboardEmployee) => b.score - a.score
        );

        setEmpLists(sorted);
      }
    };
    myFunc();
  }, [dispatch, employerExploreQuery, jobs]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Find Talent Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        {empList.map((emp) => {
          return (
            <>
              <div>
                Employee Name : {emp.firstName} {emp.lastName}
              </div>
              <div>Job Title : {emp.location}</div>
              <div>Score : {emp.score}</div>
            </>
          );
        })}
        {/* <div className="bg-red-500 h-96">H</div>
        <div className="bg-blue-500 h-96">H</div>
        <div className="bg-yellow-500 h-96">H</div> */}
      </div>
    </div>
  );
};

export default EmployerDashboardExplore;
