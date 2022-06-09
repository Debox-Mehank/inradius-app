import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardEmployeeCardData } from "../../../features/dashboard.sice";
import {
  EmployerJobStatusEnum,
  useEmployerExploreLazyQuery,
  useMarkInterestMutation,
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
  const [markInterestMutation] = useMarkInterestMutation();

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
          fetchPolicy: "network-only",
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
            employeeId: el.employeeId._id,
            shortDescription: el.employeeId.shortDescription,
          }))
        );
      }
    };
    myFunc();
  }, [dispatch, employerExploreQuery, dashboardEmployer, selectedJob]);

  const interestClickHandler = async (employeeId: string) => {
    dispatch(toggleLoading());
    const { data, errors } = await markInterestMutation({
      variables: {
        interest: true,
        employeeId: employeeId,
        jobId: selectedJob?._id,
      },
    });
    dispatch(toggleLoading());

    if (errors) {
      toast.error(errors[0].message, {
        autoClose: 1500,
        hideProgressBar: true,
      });
      return;
    }

    if (data) {
      if (data.markInterest) {
        toast.success("Success!", { autoClose: 1500, hideProgressBar: true });
        const oldEmpLists = [...empList];
        const newEmpLists = oldEmpLists.filter(
          (el) => el.employeeId !== employeeId
        );
        setEmpLists(newEmpLists);
      }
    }
  };

  const notInterestClickHandler = async (employeeId: string) => {
    dispatch(toggleLoading());
    const { data, errors } = await markInterestMutation({
      variables: {
        interest: false,
        employeeId: employeeId,
        jobId: selectedJob?._id,
      },
    });
    dispatch(toggleLoading());

    if (errors) {
      toast.error(errors[0].message, {
        autoClose: 1500,
        hideProgressBar: true,
      });
      return;
    }

    if (data) {
      if (data.markInterest) {
        toast.success("Success!", { autoClose: 1500, hideProgressBar: true });
      }
    }
  };

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Find Talent Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        {empList.length > 0 ? (
          <>
            {empList.map((emp, idx) => {
              return (
                <EmployerDashboardEmployeeLisitingCard
                  data={{ ...emp }}
                  interestHandler={interestClickHandler}
                  notInterestHandler={notInterestClickHandler}
                  key={idx}
                />
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
              "Oops, currently there are no profiles matching your criteria,\ntry expanding or altering your preferences."
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployerDashboardExplore;
