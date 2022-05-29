import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { useUpdateEmployeeMutation } from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeSubDomainSkill = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allSubdomains = useSelector(
    (state: RootState) => state.common.allSubdomains
  );
  const allSkills = useSelector((state: RootState) => state.common.allSkills);

  const domain = useSelector(
    (state: RootState) => state.employee.employee.domain
  );
  const subDomain = useSelector(
    (state: RootState) => state.employee.employee.subDomain
  );
  const skills = useSelector(
    (state: RootState) => state.employee.employee.skills
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (subDomain === null) {
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

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
          subDomain: subDomain?._id,
          skills: skills.map((el) => el._id),
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
      <div className="flex flex-col max-w-xl w-full h-full justify-center">
        <PageHeading text={"Subdomain & Skills"} />
        <div className="flex flex-col justify-start">
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
                    dispatch(updateEmployeeData({ subDomain: i, skills: [] }));
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
        </div>
        <br />
        {subDomain !== null ? (
          <div className="flex flex-col justify-start">
            <PageSubHeading
              text="Choose Skills"
              desc="Choose your top 4 skills!"
            />
            <div className="flex flex-row gap-4 flex-wrap">
              {allSkills
                .filter((el) => el.subDomain._id === subDomain?._id)
                .map((i, idx) => {
                  var myskills = [...(skills ?? [])];
                  var checkIndex = myskills.findIndex((el) => el._id === i._id);
                  return (
                    <p
                      key={idx}
                      className={`${
                        checkIndex >= 0
                          ? "bg-primary text-white"
                          : "bg-lightGray text-black"
                      } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                      onClick={() => {
                        if (checkIndex >= 0) {
                          // remove skill
                          myskills = myskills.filter((el) => el._id !== i._id);
                        } else {
                          // add skill
                          myskills?.push({ _id: i._id, skill: i.skill });
                        }
                        dispatch(updateEmployeeData({ skills: myskills }));
                      }}
                    >
                      {i.skill}
                      {checkIndex >= 0 ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          size="1x"
                          className={`text-white`}
                        />
                      ) : null}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : null}
        <br />
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeSubDomainSkill;
