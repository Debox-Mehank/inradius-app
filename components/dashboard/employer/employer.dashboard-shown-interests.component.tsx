import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardPagesEnum } from "../../../features/dashboard.sice";
import { useGetShownInterestsLazyQuery } from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployerInterestCard from "./employer.dashboard-interest-card.component";

const EmployerDashboardShownInterests = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );
  const selectedJob = useSelector(
    (state: RootState) => state.dashboard.selectedJob
  );

  const [interestsList, setInterestsList] = useState<any[]>([]);

  const [getShownInterestsQuery] = useGetShownInterestsLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data, error } = await getShownInterestsQuery({
        variables: {
          jobId: selectedJob?._id,
        },
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
          userImage: el.employeeId.user.image ? el.employeeId.user.image : null,
          domain: el.employeeId.domain?.domain,
          expectedPay: el.employeeId.expectedPay,
          firstName: el.employeeId.user.firstName,
          lastName: el.employeeId.user.lastName,
          location: el.employeeId.location?.location,
          skills: el.employeeId.skills.map((s) => s.skill),
          subDomain: el.employeeId.subDomain.map((sd) => sd.subDomain),
          employeeId: el.employeeId._id,
          shortDescription: el.employeeId.shortDescription,
        }))
      );
    };
    if (currentPage === DashboardPagesEnum["shown-interests"] && selectedJob) {
      myFunc();
    }
  }, [dispatch, getShownInterestsQuery, currentPage, selectedJob]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Shown Interest" />
      <div className="overflow-y-auto dashboard-scroll">
        {interestsList.length > 0 ? (
          <>
            {interestsList.map((emp, idx) => {
              return <EmployerInterestCard data={{ ...emp }} key={idx} />;
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

export default EmployerDashboardShownInterests;
