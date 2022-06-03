import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { toggleLoading } from "../../features/common.slice";
import { updateJobData } from "../../features/job.slice";
import {
  EmployerJobTypeEnum,
  useUpdateEmployerJobMutation,
} from "../../generated/graphql";
import {
  reactMultiSelectColorStyles,
  reactSelectColorStyles,
} from "../../utils/common";
import {
  PageHeading,
  PageSubHeading,
} from "../profile/common/heading.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";
import JobDetailsPrevButton from "./common/jobs.prevbutton.component";

const JobDetailsSubdomainSkill = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const allSubdomains = useSelector(
    (state: RootState) => state.common.allSubdomains
  );
  const allSkills = useSelector((state: RootState) => state.common.allSkills);

  const domain = useSelector((state: RootState) => state.job.job.domain);
  const subDomain = useSelector((state: RootState) => state.job.job.subDomain);

  const skills = useSelector((state: RootState) => state.job.job.skills);

  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!subDomain || subDomain.length === 0) {
      toast.info("Select sub-domain to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (skills === undefined || skills?.length === 0) {
      toast.info("Select skills to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (skills.length < 4) {
      toast.info("Select minimum 4 skills to continue!", {
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
          subDomain: subDomain.map((el) => el._id),
          skills: skills.map((el) => el.value),
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
      <div className="flex flex-col max-w-2xl w-full h-full justify-center">
        <PageHeading text={"Job Subdomain & Skills"} />
        <div className="flex flex-col justify-start">
          <PageSubHeading
            text="Select Subdomain"
            desc="Choose upto 3 sudomains!"
          />
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col justify-start w-full">
              {(subDomain ?? []).length > 0 && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                  Select Sub-domains
                </p>
              )}
              <Select<{ _id: string; subDomain: string }, true>
                options={allSubdomains
                  .filter((el) => el.domain._id === domain?._id)
                  .map((el) => ({
                    _id: el._id,
                    subDomain: el.subDomain,
                  }))}
                getOptionLabel={(subDomain: {
                  _id: string;
                  subDomain: string;
                }) => subDomain.subDomain}
                getOptionValue={(subDomain: {
                  _id: string;
                  subDomain: string;
                }) => subDomain._id}
                className="w-full"
                placeholder="Select Sub-domains"
                value={subDomain?.map((el) => ({
                  _id: el._id,
                  subDomain: el.subDomain,
                }))}
                isMulti
                onChange={(
                  value: MultiValue<{ _id: string; subDomain: string }>
                ) => {
                  if (value.length > 3) {
                    toast.info("Maximum 3 subdomains can be added!", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }
                  dispatch(
                    updateJobData({
                      subDomain: value.map((el) => ({
                        _id: el._id,
                        subDomain: el.subDomain,
                      })),
                    })
                  );
                }}
                styles={reactMultiSelectColorStyles}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-start">
          <PageSubHeading text="Choose Subdomain" />
          <div className="flex flex-row gap-4 flex-wrap">
            {allSubdomains
              .filter((el) => el.domain._id === domain?._id)
              .map((i, idx) => (
                <p
                  key={idx}
                  className={`${
                    i._id === subDomain?._id
                      ? "bg-primary text-white"
                      : "bg-lightGray text-black"
                  } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                  onClick={() => {
                    dispatch(updateJobData({ subDomain: i, skills: [] }));
                  }}
                >
                  {i.subDomain}
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="1x"
                    className={`${
                      i._id === subDomain?._id ? "block" : "hidden"
                    } text-white`}
                  />
                </p>
              ))}
          </div>
        </div> */}
        <br />
        <div className="flex flex-col justify-start">
          <PageSubHeading
            text="Select Skills / Tools"
            desc="Choose your top 4 skills / Tools!"
          />
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col justify-start w-full">
              {(skills ?? []).length > 0 && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                  Select Skills / Tools
                </p>
              )}
              <Select<{ _id: string; skill: string }, true>
                options={allSkills.map((el) => ({
                  _id: el._id,
                  skill: el.skill,
                }))}
                getOptionLabel={(skill: { _id: string; skill: string }) =>
                  skill.skill
                }
                getOptionValue={(skill: { _id: string; skill: string }) =>
                  skill._id
                }
                className="w-full"
                placeholder="Select Skills / Tools"
                value={skills?.map((el) => ({
                  _id: el.value,
                  skill: el.label,
                }))}
                isMulti
                onChange={(
                  value: MultiValue<{ _id: string; skill: string }>
                ) => {
                  if (value.length > 4) {
                    toast.info("Maximum 4 skills / tools can be added!", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }
                  dispatch(
                    updateJobData({
                      skills: value.map((el) => ({
                        label: el.skill,
                        value: el._id,
                      })),
                    })
                  );
                }}
                styles={reactMultiSelectColorStyles}
              />
            </div>
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

export default JobDetailsSubdomainSkill;
