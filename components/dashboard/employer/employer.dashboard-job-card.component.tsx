import { useRouter } from "next/router";
import { EmployerJobState, JOB_STEPS_ENUM } from "../../../features/job.slice";

interface EmployerDashboardJobCardProps {
  job: EmployerJobState;
}

const EmployerDashboardJobCard = ({ job }: EmployerDashboardJobCardProps) => {
  const router = useRouter();
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
          <p className="text-xs font-normal flex items-center justify-between my-2 text-justify">
            {job.jobDesc}
          </p>
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
