import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import { PageHeading } from "../../../profile/common/heading.component";
import { reactSelectColorStyles } from "../../../../utils/common";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

interface EmployeeQualificationEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeQualificationEdit = ({
  setEditModals,
}: EmployeeQualificationEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allQualifications = useSelector(
    (state: RootState) => state.common.allQualifications
  );

  const qualification = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.qualification
  );

  const submitHandler = async () => {
    if (qualification === null) {
      toast.info("Select qualification to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: { input: { qualification: qualification?._id } },
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

    toast.success("Qualification Updated Successfully!", {
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
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text="Qualification" />
        <Select<{ _id: string; qualification: string }>
          options={allQualifications}
          getOptionLabel={(qual: { _id: string; qualification: string }) =>
            qual.qualification
          }
          getOptionValue={(qual: { _id: string; qualification: string }) =>
            qual._id
          }
          className="w-full"
          placeholder="Select Qualification..."
          value={qualification}
          onChange={(value) => {
            dispatch(updateDashboardEmployeeData({ qualification: value }));
          }}
          styles={reactSelectColorStyles}
        />
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

export default EmployeeQualificationEdit;
