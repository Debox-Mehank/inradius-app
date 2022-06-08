import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import {
  DashboardPagesEnum,
  InterestsEmployerCardData,
} from "../../../features/dashboard.sice";
import {
  useGetShownInterestsLazyQuery,
  useMarkInterestMutation,
} from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployeeInterestCard from "./employee.dashboard-interest-card.component";

const EmployeeDashboardShownInterests = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const [interestsList, setInterestsList] = useState<
    InterestsEmployerCardData[]
  >([]);

  const [getShownInterestsQuery] = useGetShownInterestsLazyQuery();
  const [markInterestMutation] = useMarkInterestMutation();

  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data, error } = await getShownInterestsQuery({
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

      setInterestsList(
        data.getShownInterests.map((el) => ({
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
    if (currentPage === DashboardPagesEnum["shown-interests"]) {
      myFunc();
    }
  }, [dispatch, getShownInterestsQuery, currentPage]);

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
        toast.success("Congragulations on perfect match!", {
          autoClose: 1500,
          hideProgressBar: true,
        });
        const oldList = [...interestsList];
        const newList = oldList.filter((el) => el.jobId! !== jobId);
        setInterestsList(newList);
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
      const oldList = [...interestsList];
      const newList = oldList.filter((el) => el.jobId ?? "" !== jobId);
      setInterestsList(newList);
    }
  };

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Shown Interest" />
      <div className="overflow-y-auto dashboard-scroll">
        {interestsList.length > 0 ? (
          <>
            {interestsList.map((job, idx) => {
              return (
                <EmployeeInterestCard
                  data={{ ...job }}
                  key={idx}
                  shownInterest={true}
                  interestHandler={interestClickHandler}
                  notInterestHandler={notInterestClickHandler}
                />
              );
            })}
          </>
        ) : (
          <NoResults
            message={
              "Some dummy content will come here,\nit will continue till second line to look good!"
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboardShownInterests;
