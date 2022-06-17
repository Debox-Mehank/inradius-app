import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
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
import { reactSelectColorStyles } from "../../../../utils/common";

interface EmployeeRelevantExpEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeRelevantExpEdit = ({
  setEditModals,
}: EmployeeRelevantExpEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const totalExp = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.totalExp
  );

  const relevantExp = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.relevantExp
  );

  const submitHandler = async () => {
    if (!totalExp?.years || !totalExp.months) {
      toast.info("Fill your total experience to continue!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (!relevantExp?.years || !relevantExp.months) {
      toast.info("Fill your relevant experience to continue!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    const totExp =
      parseInt(totalExp.years.value) * 12 + parseInt(totalExp.months.value);
    const relExp =
      parseInt(relevantExp.years.value) * 12 +
      parseInt(relevantExp.months.value);

    if (totExp < relExp) {
      toast.info(
        "Relevant experience cannot be greater than total experience",
        {
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
          relevantExp: {
            years: relevantExp.years.value,
            months: relevantExp.months.value,
          },
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

    toast.success("Relevant Experience Updated Successfully!", {
      hideProgressBar: true,
      autoClose: 1500,
    });
    setEditModals(undefined);
  };

  const year_month_array: { value: string; label: string }[] = Array.from(
    Array(16).keys()
  ).map((el) => ({ value: el.toString(), label: el.toString() }));

  return (
    <div
      data-aos="fade-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center px-8"
    >
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text={"Relevant Experience"} />
        <PageSubHeading
          text={"Relevant Experience"}
          desc={"Add relevant experience in years and months"}
        />
        <div className="flex flex-row justify-center items-end gap-4">
          <div className="flex flex-col justify-start w-full">
            {relevantExp?.years && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Years
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Years"
              value={relevantExp?.years}
              onChange={(value) => {
                dispatch(
                  updateDashboardEmployeeData({
                    relevantExp: { ...relevantExp!, years: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {relevantExp?.months && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Months
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Months"
              value={relevantExp?.months}
              onChange={(value) => {
                dispatch(
                  updateDashboardEmployeeData({
                    relevantExp: { ...relevantExp!, months: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
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

export default EmployeeRelevantExpEdit;
