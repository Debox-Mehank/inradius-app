import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import { reactSelectColorStyles } from "../../../../utils/common";
import { PageHeading } from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

interface EmployeeLocationEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeLocationEdit = ({ setEditModals }: EmployeeLocationEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allLocations = useSelector(
    (state: RootState) => state.common.allLocations
  );

  const location = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.location
  );

  const submitHandler = async () => {
    if (location === null) {
      toast.info("Select location to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: { input: { location: location?._id } },
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

    toast.success("Location Updated Successfully!", {
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
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-sm w-full p-4">
        <PageHeading text="Update Location" />
        <Select<{ _id: string; location: string }>
          options={allLocations}
          getOptionLabel={(location: { _id: string; location: string }) =>
            location.location
          }
          getOptionValue={(location: { _id: string; location: string }) =>
            location._id
          }
          className="w-full"
          placeholder="Select Location..."
          value={location}
          onChange={(value) => {
            dispatch(
              updateDashboardEmployeeData({
                location: value,
              })
            );
          }}
          styles={reactSelectColorStyles}
        />
        <div className="flex flex-row justify-center gap-2 w-full p-4">
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

export default EmployeeLocationEdit;
