import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import {
  PageHeading,
  PageSubHeading,
} from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

const numWords = require("num-words");

interface EmployeeExpectedPayEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeExpectedPayEdit = ({
  setEditModals,
}: EmployeeExpectedPayEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const fresher = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.fresher
  );

  const expectedPay = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.expectedPay
  );
  const currentPay = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.currentPay
  );

  const submitHandler = async () => {
    if (!fresher && !currentPay) {
      toast.info("Enter current pay to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }
    if (!expectedPay) {
      toast.info("Enter expected pay to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!fresher && currentPay) {
      if (currentPay > expectedPay) {
        toast.info("Your expected pay must be greater than current pay ", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: { expectedPay: expectedPay },
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

    toast.success("Expected Pay Updated Successfully!", {
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
        <PageHeading text="Salary Details" />
        <div className="flex justify-start flex-col">
          <PageSubHeading text={"Expected Annual Pay"} />
          <input
            type={"number"}
            className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
            placeholder={"₹ 1,000,000"}
            autoComplete="off"
            value={expectedPay ?? ""}
            maxLength={9}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (e.target.value.length <= 9) {
                  dispatch(
                    updateDashboardEmployeeData({
                      expectedPay: parseInt(e.target.value),
                    })
                  );
                }
              } else {
                dispatch(
                  updateDashboardEmployeeData({
                    expectedPay: null,
                  })
                );
              }
            }}
          />
          {expectedPay && expectedPay !== null && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mt-2 capitalize">
              {numWords(expectedPay)}
            </p>
          )}
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

export default EmployeeExpectedPayEdit;
