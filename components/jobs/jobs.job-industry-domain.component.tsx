import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const JobDetailsIndustryDomain = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const allIndustries = useSelector(
    (state: RootState) => state.common.allIndustries
  );
  const allDomains = useSelector((state: RootState) => state.common.allDomains);

  const industry = useSelector((state: RootState) => state.job.job.industry);
  const domain = useSelector((state: RootState) => state.job.job.domain);

  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!industry) {
      toast.info("Select industry to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!domain) {
      toast.info("Select domain to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employer Job Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployerJobMutation({
      variables: {
        input: { _id: jobId, industry: industry._id, domain: domain._id },
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
      <div className="flex flex-col max-w-2xl w-full h-full justify-center">
        <PageHeading text={"Job Industry & Domain"} />
        <div className="flex flex-col justify-start">
          <PageSubHeading text="Choose Industry" />

          <div className="flex flex-row gap-4 flex-wrap">
            {allIndustries.map((i, idx) => (
              <p
                key={idx}
                className={`${
                  i._id === industry?._id
                    ? "bg-primary text-white"
                    : "bg-lightGray text-black"
                } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => {
                  dispatch(updateJobData({ industry: i }));
                }}
              >
                {i.industry}
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="1x"
                  className={`${
                    i._id === industry?._id ? "block" : "hidden"
                  } text-white`}
                />
              </p>
            ))}
          </div>
        </div>
        <br />
        <div className="flex flex-col justify-start">
          <PageSubHeading text="Choose Domain" />

          <div className="flex flex-row gap-4 flex-wrap">
            {allDomains.map((i, idx) => (
              <p
                key={idx}
                className={`${
                  i._id === domain?._id
                    ? "bg-primary text-white"
                    : "bg-lightGray text-black"
                } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => {
                  if (domain !== null) {
                    if (domain?._id !== i._id) {
                      dispatch(
                        updateJobData({
                          domain: i,
                          subDomain: [],
                        })
                      );
                    }
                  } else {
                    dispatch(
                      updateJobData({
                        domain: i,
                      })
                    );
                  }
                }}
              >
                {i.domain}
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="1x"
                  className={`${
                    i._id === domain?._id ? "block" : "hidden"
                  } text-white`}
                />
              </p>
            ))}
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

export default JobDetailsIndustryDomain;
