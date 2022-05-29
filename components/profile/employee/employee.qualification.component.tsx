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
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeQualification = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allQualifications = useSelector(
    (state: RootState) => state.common.allQualifications
  );

  const qualification = useSelector(
    (state: RootState) => state.employee.employee.qualification
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
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
            dispatch(updateEmployeeData({ qualification: value }));
          }}
          styles={reactSelectColorStyles}
        />
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeQualification;
