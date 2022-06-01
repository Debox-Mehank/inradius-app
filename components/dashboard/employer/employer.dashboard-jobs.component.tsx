import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { JOB_STEPS_ENUM } from "../../../features/job.slice";
import { useAddEmployerJobMutation } from "../../../generated/graphql";
import ReusableButton from "../../reusables/ReusableButton";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployerDashboardJobCard from "./employer.dashboard-job-card.component";

const EmployerDashboardJobs = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [addEmployerJobMutation] = useAddEmployerJobMutation();

  const jobs = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.jobs
  );
  return (
    <div className="flex flex-col h-full px-8 relative">
      <div className="flex justify-start gap-5 items-center">
        <DashboardPageHeading title="Manage Jobs" />
        <ReusableButton
          bg="bg-primary"
          text="text-white"
          title="New Job Listing"
          size="small"
          icon={faPlusCircle}
          onClick={async () => {
            dispatch(toggleLoading());
            const { data, errors } = await addEmployerJobMutation();
            dispatch(toggleLoading());

            if (errors !== undefined) {
              toast.error(errors[0].message, {
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

            router.push(
              `/job-details?page=${JOB_STEPS_ENUM["job-type"]}&jobId=${data.addEmployerJob}`
            );
          }}
        />
      </div>
      {/* All Jobs Listing */}
      <br />
      {jobs && jobs.length > 0 ? (
        <div className="overflow-y-auto dashboard-scroll">
          {/* {Array.from(Array(100)).map((val, idx) => (
            <EmployerDashboardJobCard key={idx} title={"some text"} />
          ))} */}
          {jobs.map((job, idx) => (
            <EmployerDashboardJobCard key={idx} job={job} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full bg-red-500 flex-1">No Jobs Animation</div>
      )}
    </div>
  );
};

export default EmployerDashboardJobs;
