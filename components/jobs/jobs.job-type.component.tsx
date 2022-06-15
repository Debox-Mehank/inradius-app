import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { toggleLoading } from "../../features/common.slice";
import { updateJobData } from "../../features/job.slice";
import {
  EmployerJobTypeEnum,
  useUpdateEmployerJobMutation,
} from "../../generated/graphql";
import { reactSelectColorStyles } from "../../utils/common";
import { PageHeading } from "../profile/common/heading.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";

const JobDetailsJobType = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const allJobTypes: { label: string; value: EmployerJobTypeEnum }[] = [
    {
      label: EmployerJobTypeEnum.Fulltime,
      value: EmployerJobTypeEnum.Fulltime,
    },
    {
      label: EmployerJobTypeEnum.Contract,
      value: EmployerJobTypeEnum.Contract,
    },
    { label: EmployerJobTypeEnum.Project, value: EmployerJobTypeEnum.Project },
  ];

  const jobTitle = useSelector((state: RootState) => state.job.job.jobTitle);
  const jobDesc = useSelector((state: RootState) => state.job.job.jobDesc);
  const jobType = useSelector((state: RootState) => state.job.job.jobType);
  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!jobTitle) {
      toast.info("Provide job title to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!jobDesc) {
      toast.info("Provide job description to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!jobType) {
      toast.info("Select job type to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employer Job Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployerJobMutation({
      variables: {
        input: {
          _id: jobId,
          jobType: jobType?.value,
          jobTitle: jobTitle,
          jobDesc: jobDesc,
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
        <PageHeading text="Job Info" />
        <div className="flex flex-col justify-start w-full mb-4">
          {jobTitle && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
              {`Job Title`}
            </p>
          )}
          <input
            type={"text"}
            className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
            placeholder={"Job Title"}
            autoComplete="off"
            value={jobTitle ?? ""}
            onChange={(e) => {
              dispatch(
                updateJobData({
                  jobTitle: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex flex-col justify-start w-full mb-4">
          {jobDesc && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
              {`Job Description`}
            </p>
          )}
          <textarea
            className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
            placeholder={"Job Description"}
            autoComplete="off"
            value={jobDesc ?? ""}
            rows={4}
            onChange={(e) => {
              dispatch(
                updateJobData({
                  jobDesc: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex flex-col justify-start w-full">
          {jobType && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
              {`Job Type`}
            </p>
          )}
          <Select<{ label: string; value: EmployerJobTypeEnum }>
            options={allJobTypes}
            getOptionLabel={(typ: {
              label: string;
              value: EmployerJobTypeEnum;
            }) => typ.label}
            getOptionValue={(typ: {
              label: string;
              value: EmployerJobTypeEnum;
            }) => typ.value}
            className="w-full"
            placeholder="Select Job Type..."
            value={jobType}
            onChange={(value) => {
              dispatch(updateJobData({ jobType: value }));
            }}
            styles={reactSelectColorStyles}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          {/* <EmployeePrevButton handlerFunction={prevHandler} /> */}
          <JobDetailsNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsJobType;
