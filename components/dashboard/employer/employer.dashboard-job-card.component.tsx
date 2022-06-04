import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateDashboardEmployerData } from "../../../features/dashboard.sice";
import { EmployerJobState, JOB_STEPS_ENUM } from "../../../features/job.slice";
import {
  EmployerJobStatusEnum,
  useUpdateEmployerJobMutation,
} from "../../../generated/graphql";

interface EmployerDashboardJobCardProps {
  job: EmployerJobState;
}

const EmployerDashboardJobCard = ({ job }: EmployerDashboardJobCardProps) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const jobs = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.jobs
  );

  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const updateJobStatus = async (jobId: string) => {
    // Update Employer Job Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployerJobMutation({
      variables: {
        input: {
          _id: jobId,
          jobStatus: EmployerJobStatusEnum.Open,
        },
      },
    });
    dispatch(toggleLoading());
    if (errors !== undefined) {
      toast.error(errors[0].message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (data === undefined) {
      toast.error("Something went wrong!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (jobs) {
      var jobsArr = [...jobs.map((el) => ({ ...el }))];
      const checkJob = jobsArr.findIndex((el) => el._id === jobId);
      if (checkJob >= 0) {
        jobsArr[checkJob].jobStatus = EmployerJobStatusEnum.Open;
        dispatch(updateDashboardEmployerData({ jobs: jobsArr }));
      }
    }
  };

  return (
    <>
      {job.listingComplete ? (
        <div
          className="flex flex-col max-w-2xl bg-lightGray text-darkGray rounded-md shadow-md p-4 mb-4"
          // onClick={() => {
          //   router.push(
          //     `/job-details?page=${JOB_STEPS_ENUM["job-type"]}&jobId=${job._id}`
          //   );
          // }}
        >
          <p className="text-base font-semibold flex items-center justify-between">
            {job.jobTitle}{" "}
            <span className="text-xs bg-primary text-white px-3 py-2 rounded-md">
              Status : {job.jobStatus}
            </span>
          </p>
          <p className="text-xs font-normal flex items-center justify-between">
            {job.jobType?.value} | {job.location?.location}
          </p>
          <div className="w-full flex justify-start items-center my-1">
            <p className="text-xs font-normal flex items-center justify-between">
              Qualification: {job.qualification?.qualification}
            </p>
            <p className="text-xs font-normal flex items-center justify-between mx-2">
              |
            </p>
            <p className="text-xs font-normal flex items-center justify-between">
              Required Experience {job.minRequiredExp?.years.value} year{" "}
              {job.minRequiredExp?.months.value} months
            </p>
          </div>
          <p className="text-xs font-normal flex items-center justify-between">
            {`₹ ${(job.minPay ?? "")
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  `}
            -
            {`  ₹ ${(job.maxPay ?? "")
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
          <p className="text-xs font-normal flex items-center justify-between my-2 text-justify">
            {job.jobDesc}
          </p>
          <div className="flex justify-start gap-4 mt-2">
            <span
              className="text-xs bg-primary text-white px-3 py-2 rounded-md cursor-pointer"
              onClick={() => {
                updateJobStatus((job._id ?? "").toString());
              }}
            >
              Mark as Open
            </span>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col max-w-2xl bg-lightGray text-darkGray rounded-md shadow-md p-4 mb-4 cursor-pointer"
          onClick={() => {
            router.push(
              `/job-details?page=${JOB_STEPS_ENUM["job-type"]}&jobId=${job._id}`
            );
          }}
        >
          <p className="text-base font-semibold">
            Click here to complete your job listing!
          </p>
        </div>
      )}
    </>
  );
};

export default EmployerDashboardJobCard;
