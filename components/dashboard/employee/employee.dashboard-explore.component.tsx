import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardPagesEnum } from "../../../features/dashboard.sice";
import {
  DashboardEmployer,
  useEmployeeExploreLazyQuery,
} from "../../../generated/graphql";
import DashboardPageHeading from "../common/dashboard.heading.component";

const EmployeeDashboardExplore = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const [jobLists, setJobLists] = useState<DashboardEmployer[]>([]);
  const [employeeExploreQuery] = useEmployeeExploreLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data, error } = await employeeExploreQuery();
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

      const sorted = data.employeeExplore
        .slice()
        .sort(
          (a: DashboardEmployer, b: DashboardEmployer) => b.score - a.score
        );

      setJobLists(sorted);
    };
    if (currentPage === DashboardPagesEnum.explore) {
      myFunc();
    }
  }, [dispatch, employeeExploreQuery, currentPage]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Explore Jobs Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        {jobLists.map((job, idx) => {
          return (
            <div key={idx}>
              <div>Company Name : {job.companyName}</div>
              <div>Job Title : {job.jobTitle}</div>
              <div>Score : {job.score}</div>
            </div>
          );
        })}
        {/* <div className="bg-red-500 h-96">H</div>
        <div className="bg-blue-500 h-96">H</div>
        <div className="bg-yellow-500 h-96">H</div> */}
      </div>
    </div>
  );
};

export default EmployeeDashboardExplore;
