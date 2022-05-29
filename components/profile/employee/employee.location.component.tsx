import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { useUpdateEmployeeMutation } from "../../../generated/graphql";
import { reactSelectColorStyles } from "../../../utils/common";
import { PageHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";

const EmployeeLocation = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allLocations = useSelector(
    (state: RootState) => state.common.allLocations
  );

  const location = useSelector(
    (state: RootState) => state.employee.employee.location
  );

  const nextHandler = async (moveNext: () => void) => {
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
        <PageHeading text="Location" />
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
            dispatch(updateEmployeeData({ location: value }));
          }}
          styles={reactSelectColorStyles}
        />
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLocation;
