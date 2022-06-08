import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { DashboardPagesEnum } from "../../../features/dashboard.sice";
import { useGetMatchedLazyQuery } from "../../../generated/graphql";
import NoResults from "../../reusables/NoResults";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployeeInterestCard from "./employee.dashboard-interest-card.component";
import EmployeeMatchedCard from "./employee.dashboard-matched-card.component";

const EmployeeDashboardMatched = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
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
    if (currentPage === DashboardPagesEnum.matched) {
      myFunc();
    }
  }, [dispatch, getMatchedQuery, currentPage]);

  return (
    <div className="flex flex-col px-8 relative">
      <DashboardPageHeading title="Matched" />
      <div className="overflow-y-auto dashboard-scroll">
        {interestsList.length > 0 ? (
          <>
            {interestsList.map((job, idx) => {
              return <EmployeeMatchedCard data={{ ...job }} key={idx} />;
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

export default EmployeeDashboardMatched;
