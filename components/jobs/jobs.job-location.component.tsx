import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { toggleLoading } from "../../features/common.slice";
import { updateJobData } from "../../features/job.slice";
import { useUpdateEmployerJobMutation } from "../../generated/graphql";
import { reactSelectColorStyles } from "../../utils/common";
import { PageHeading } from "../profile/common/heading.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";
import JobDetailsPrevButton from "./common/jobs.prevbutton.component";

const JobDetailsLocation = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const allLocations = useSelector(
    (state: RootState) => state.common.allLocations
  );

  const jobLocation = useSelector((state: RootState) => state.job.job.location);
  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!jobLocation) {
      toast.info("Select job location to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employer Job Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployerJobMutation({
      variables: { input: { _id: jobId, location: jobLocation._id } },
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

    moveNext();
  };

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text="Job Location" />
        <Select<{ _id: string; location: string }>
          options={allLocations}
          getOptionLabel={(loc: { _id: string; location: string }) =>
            loc.location
          }
          getOptionValue={(loc: { _id: string; location: string }) => loc._id}
          className="w-full"
          placeholder="Select Job Location..."
          value={jobLocation}
          onChange={(value) => {
            dispatch(updateJobData({ location: value }));
          }}
          styles={reactSelectColorStyles}
        />
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <JobDetailsPrevButton handlerFunction={prevHandler} />
          <JobDetailsNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsLocation;
