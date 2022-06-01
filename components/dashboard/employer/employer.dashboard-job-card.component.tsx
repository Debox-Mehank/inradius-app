import { useRouter } from "next/router";
import { EmployerJobState, JOB_STEPS_ENUM } from "../../../features/job.slice";

interface EmployerDashboardJobCardProps {
  job: EmployerJobState;
}

const EmployerDashboardJobCard = ({ job }: EmployerDashboardJobCardProps) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col max-w-2xl bg-lightGray text-darkGray rounded-md shadow-md p-4 mb-4"
      onClick={() => {
        router.push(
          `/job-details?page=${JOB_STEPS_ENUM["job-type"]}&jobId=${job._id}`
        );
      }}
    >
      <p className="text-base font-semibold">{job.jobTitle ?? "Hello"}</p>
    </div>
  );
};

export default EmployerDashboardJobCard;
