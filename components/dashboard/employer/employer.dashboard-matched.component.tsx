import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardPagesEnum } from "../../../features/dashboard.sice";
import { useGetMatchedLazyQuery } from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployerMatchedCard from "./employer.dashboard-matched-card.component";

const EmployerDashboardMatched = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );
  const selectedJob = useSelector(
    (state: RootState) => state.dashboard.selectedJob
  );

  const [interestsList, setInterestsList] = useState<any[]>([]);

  const [getMatchedQuery] = useGetMatchedLazyQuery();

  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());
      const { data, error } = await getMatchedQuery({
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
        data.getMatched.map((el) => ({
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
    if (currentPage === DashboardPagesEnum.matched) {
      myFunc();
    }
  }, [dispatch, getMatchedQuery, currentPage, selectedJob]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Matched" />
      <div className="overflow-y-auto dashboard-scroll">
        {interestsList.length > 0 ? (
          <>
            {interestsList.map((emp, idx) => {
              return <EmployerMatchedCard data={{ ...emp }} key={idx} />;
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

export default EmployerDashboardMatched;
