import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setSelectedJob } from "../../../features/dashboard.sice";
import { EmployerJobStatusEnum } from "../../../generated/graphql";

const JobsSlider = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.jobs
  );
  const selectedJob = useSelector(
    (state: RootState) => state.dashboard.selectedJob
  );

  return (
    <div className="w-full h-1/5 mt-2 overflow-x-auto overscroll-x-contain">
      <div className="px-8 py-4 grid grid-flow-col gap-4 last:after:w-8">
        {jobs
          ?.filter(
            (el) =>
              el.jobStatus === EmployerJobStatusEnum.Open && el.listingComplete
          )
          .map((job, idx) => {
            return (
              <div
                key={idx}
                className={`px-4 py-6 shadow-lg rounded-md w-60 flex-1 ${
                  job._id === selectedJob?._id
                    ? "bg-primary text-white"
                    : "bg-lightGray text-black"
                }`}
                onClick={() => {
                  dispatch(setSelectedJob(job));
                }}
              >
                <p className="text-base font-semibold">{job.jobTitle}</p>
                <p className="text-sm font-medium">{job.location?.location}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default JobsSlider;
