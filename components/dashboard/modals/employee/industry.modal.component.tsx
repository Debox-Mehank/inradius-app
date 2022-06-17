import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import {
  PageHeading,
  PageSubHeading,
} from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

interface EmployeeIndustryEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeIndustryEdit = ({ setEditModals }: EmployeeIndustryEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allIndustries = useSelector(
    (state: RootState) => state.common.allIndustries
  );
  const industry = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.industry
  );

  const submitHandler = async () => {
    if (industry === null) {
      toast.info("Select industry to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: { input: { industry: industry?._id } },
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

    toast.success("Industry Updated Successfully!", {
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
        <PageHeading text={"Industry"} />
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
                  dispatch(updateDashboardEmployeeData({ industry: i }));
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

export default EmployeeIndustryEdit;
