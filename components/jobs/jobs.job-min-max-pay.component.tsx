import { useRouter } from "next/router";
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

const numWords = require("num-words");

const JobDetailsMinMaxPay = () => {
  const router = useRouter();

  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const minPay = useSelector((state: RootState) => state.job.job.minPay);
  const maxPay = useSelector((state: RootState) => state.job.job.maxPay);

  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!minPay) {
      toast.info("Select job location to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!maxPay) {
      toast.info("Select job location to continue", {
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
          minPay: minPay,
          maxPay: maxPay,
          listingComplete: true,
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

    toast.success("Job details added successfully!", {
      autoClose: 2000,
      hideProgressBar: true,
    });

    moveNext();

    dispatch(toggleLoading());

    setTimeout(() => {
      router.replace("/dashboard");
      dispatch(toggleLoading());
    }, 2000);
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
        <PageHeading text="Job Pay" />
        <div className="flex justify-start flex-col">
          <PageSubHeading text={"Minimum Annual Pay"} />
          <input
            type={"number"}
            className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
            placeholder={"₹ 1,000,000"}
            autoComplete="off"
            value={minPay ?? ""}
            maxLength={9}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (e.target.value.length <= 9) {
                  dispatch(
                    updateJobData({
                      minPay: parseInt(e.target.value),
                    })
                  );
                }
              } else {
                dispatch(
                  updateJobData({
                    minPay: null,
                  })
                );
              }
            }}
          />
          {minPay && minPay !== null && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mt-2 capitalize">
              {numWords(minPay)}
            </p>
          )}
        </div>
        <br />
        <div className="flex justify-start flex-col">
          <PageSubHeading text={"Maximum Annual Pay"} />
          <input
            type={"number"}
            className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
            placeholder={"₹ 1,000,000"}
            autoComplete="off"
            value={maxPay ?? ""}
            maxLength={9}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (e.target.value.length <= 9) {
                  dispatch(
                    updateJobData({
                      maxPay: parseInt(e.target.value),
                    })
                  );
                }
              } else {
                dispatch(
                  updateJobData({
                    maxPay: null,
                  })
                );
              }
            }}
          />
          {maxPay && maxPay !== null && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mt-2 capitalize">
              {numWords(maxPay)}
            </p>
          )}
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <JobDetailsPrevButton handlerFunction={prevHandler} />
          <JobDetailsNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsMinMaxPay;
