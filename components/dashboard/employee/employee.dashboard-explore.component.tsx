import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import {
  DashboardEmployerCardData,
  DashboardPagesEnum,
} from "../../../features/dashboard.sice";
import {
  DashboardEmployer,
  useEmployeeExploreLazyQuery,
  useMarkInterestMutation,
} from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployeeDashboardJobLisitingCard from "./employee.dashboard-joblisting-card.component";

const EmployeeDashboardExplore = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const [jobLists, setJobLists] = useState<DashboardEmployerCardData[]>([]);
  const [employeeExploreQuery] = useEmployeeExploreLazyQuery();
  const [markInterestMutation] = useMarkInterestMutation();

  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data, error } = await employeeExploreQuery({
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

      const sorted = data.employeeExplore
        .slice()
        .sort((a: any, b: any) => b.score - a.score);

      setJobLists(
        sorted.map((el) => ({
          score: el.score,
          skills: el.jobId.skills.map((s) => s.skill),
          subDomain: el.jobId.subDomain.map((sd) => sd.subDomain),
          companyImage: el.employerId.companyImage,
          companyName: el.employerId.companyName,
          domain: el.jobId.domain?.domain,
          jobDesc: el.jobId.jobDesc,
          jobTitle: el.jobId.jobTitle,
          jobType: el.jobId.jobType,
          location: el.jobId.location?.location,
          maxPay: el.jobId.maxPay,
          minPay: el.jobId.minPay,
          minRequiredExp: el.jobId.minRequiredExp,
          employerId: el.employerId._id,
          jobId: el.jobId._id,
        }))
      );
    };
    if (currentPage === DashboardPagesEnum.explore) {
      myFunc();
    }
  }, [dispatch, employeeExploreQuery, currentPage]);

  const interestClickHandler = async (employerId: string, jobId: string) => {
    dispatch(toggleLoading());
    const { data, errors } = await markInterestMutation({
      variables: { interest: true, employerId: employerId, jobId: jobId },
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
        toast.success("Added to your interests!", {
          autoClose: 1500,
          hideProgressBar: true,
        });
        const oldJobLists = [...jobLists];
        const newJobLists = oldJobLists.filter((el) => el.jobId !== jobId);
        setJobLists(newJobLists);
      }
    }
  };

  const notInterestClickHandler = async (employerId: string, jobId: string) => {
    dispatch(toggleLoading());
    const { data, errors } = await markInterestMutation({
      variables: { interest: false, employerId: employerId, jobId: jobId },
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
      const oldJobLists = [...jobLists];
      const newJobLists = oldJobLists.filter((el) => el.jobId !== jobId);
      setJobLists(newJobLists);
    }
  };

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Explore Jobs Near You" />
      <div className="overflow-y-auto dashboard-scroll">
        {jobLists.length > 0 ? (
          <>
            {jobLists.map((job, idx) => {
              return (
                <EmployeeDashboardJobLisitingCard
                  data={{ ...job }}
                  interestHandler={interestClickHandler}
                  notInterestHandler={notInterestClickHandler}
                  key={idx}
                />
              );
            })}
          </>
        ) : (
          <NoResults
            message={
              "Oops!, No jobs found matching your criteria.\nKeep looking for jobs in future."
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboardExplore;
