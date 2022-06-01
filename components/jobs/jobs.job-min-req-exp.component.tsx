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
import {
  PageHeading,
  PageSubHeading,
} from "../profile/common/heading.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";
import JobDetailsPrevButton from "./common/jobs.prevbutton.component";

const JobDetailsMinReqExp = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const minRequiredExp = useSelector(
    (state: RootState) => state.job.job.minRequiredExp
  );
  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!minRequiredExp) {
      toast.info("Fill your minimum required experience to continue!", {
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
          minRequiredExp: {
            years: minRequiredExp.years.value,
            months: minRequiredExp.months.value,
          },
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

  const year_month_array: { value: string; label: string }[] = Array.from(
    Array(16).keys()
  ).map((el) => ({ value: el.toString(), label: el.toString() }));

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-xl w-full">
        <PageHeading text="Minimum Required Experience" desc={""} />
        <p className="text-xs w-full text-center text-gray-500 font-medium mb-4">
          {"Add experience in years and months"}
        </p>
        <div className="flex flex-row justify-end items-end gap-4">
          <div className="flex flex-col justify-start w-full">
            {minRequiredExp?.years && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Years
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Years"
              value={minRequiredExp?.years}
              onChange={(value) => {
                dispatch(
                  updateJobData({
                    minRequiredExp: { ...minRequiredExp!, years: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {minRequiredExp?.months && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Months
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Months"
              value={minRequiredExp?.months}
              onChange={(value) => {
                dispatch(
                  updateJobData({
                    minRequiredExp: { ...minRequiredExp!, months: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <JobDetailsPrevButton handlerFunction={prevHandler} />
          <JobDetailsNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsMinReqExp;
