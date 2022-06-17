import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import {
  PageHeading,
  PageSubHeading,
} from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";
import { reactMultiSelectColorStyles } from "../../../../utils/common";

interface EmployeeSkillEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeSkillEdit = ({ setEditModals }: EmployeeSkillEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allSkills = useSelector((state: RootState) => state.common.allSkills);
  const skills = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.skills
  );

  const submitHandler = async () => {
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

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
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

    toast.success("Skills Updated Successfully!", {
      hideProgressBar: true,
      autoClose: 1500,
    });
    setEditModals(undefined);
  };

  return (
    <div
      data-aos="fade-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center px-8"
    >
      <div className="flex flex-col max-w-xl w-full h-full justify-center">
        <PageHeading text={"Skills"} />
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
                    updateDashboardEmployeeData({
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
        <br />
        <div className="flex flex-row gap-2 justify-center select-none my-6">
          <button
            type="submit"
            className={`w-max text-xs bg-white p-2 text-primary border border-primary grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              //   setShowRadiusConfirmModal(false);
              setEditModals(undefined);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-max text-xs bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              submitHandler();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSkillEdit;
