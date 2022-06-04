import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardEmployeeCardData } from "../../../features/dashboard.sice";
import {
  DashboardEmployee,
  DashboardEmployer,
  EmployerJobStatusEnum,
  useEmployeeExploreLazyQuery,
  useEmployerExploreLazyQuery,
} from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployerDashboardEmployeeLisitingCard from "./employer.dashboard-employeelisting-card.component";

const EmployerDashboardExplore = () => {
  const dispatch = useDispatch();

  const dashboardEmployer = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer
  );

  const selectedJob = useSelector(
    (state: RootState) => state.dashboard.selectedJob
  );

  const [empList, setEmpLists] = useState<DashboardEmployeeCardData[]>([]);
  const [employerExploreQuery] = useEmployerExploreLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      if (
        dashboardEmployer?.jobs &&
        dashboardEmployer?.jobs.filter(
          (el) =>
            el.jobStatus === EmployerJobStatusEnum.Open && el.listingComplete
        ).length > 0 &&
        selectedJob
      ) {
        dispatch(toggleLoading());
        const { data, error } = await employerExploreQuery({
          variables: { jobId: selectedJob._id! },
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

        const sorted = data.employerExplore
          .slice()
          .sort((a: any, b: any) => b.score - a.score);

        setEmpLists(
          sorted.map((el) => ({
            userImage: el.userId.image ? el.userId.image : null,
            domain: el.employeeId.domain?.domain,
            expectedPay: el.employeeId.expectedPay,
            firstName: el.userId.firstName,
            lastName: el.userId.lastName,
            location: el.employeeId.location?.location,
            skills: el.employeeId.skills.map((s) => s.skill),
            subDomain: el.employeeId.subDomain.map((sd) => sd.subDomain),
            score: el.score,
          }))
        );
      }
    };
    myFunc();
  }, [dispatch, employerExploreQuery, dashboardEmployer, selectedJob]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Find Talent Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        {empList.length > 0 ? (
          <>
            {empList.map((emp, idx) => {
              return (
                <EmployerDashboardEmployeeLisitingCard {...emp} key={idx} />
                // <div key={idx}>
                //   <div>
                //     Employee Name : {emp.firstName} {emp.lastName}
                //   </div>
                //   <div>Location : {emp.location}</div>
                //   <div>Score : {emp.score}</div>
                // </div>
              );
            })}
          </>
        ) : (
          <NoResults
            message={
              "Oops!, No talents found matching your criteria.\nKeep looking for talent in future."
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployerDashboardExplore;
