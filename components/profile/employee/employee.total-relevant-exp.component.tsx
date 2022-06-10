import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { useUpdateEmployeeMutation } from "../../../generated/graphql";
import { reactSelectColorStyles } from "../../../utils/common";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeTotalRelevantExp = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const totalExp = useSelector(
    (state: RootState) => state.employee.employee.totalExp
  );

  const relevantExp = useSelector(
    (state: RootState) => state.employee.employee.relevantExp
  );

  const nextHandler = async (moveNext: () => void) => {
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
        "Total experience should be same or more than relevant experience",
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
          totalExp: {
            years: totalExp.years.value,
            months: totalExp.months.value,
          },
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

    moveNext();
  };

  const year_month_array: { value: string; label: string }[] = Array.from(
    Array(16).keys()
  ).map((el) => ({ value: el.toString(), label: el.toString() }));

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text={"Total & Relevant Experience"} />
        <PageSubHeading
          text={"Total Experience"}
          desc={"Add total experience in years and months"}
        />
        <div className="flex flex-row justify-center items-end gap-4">
          <div className="flex flex-col justify-start w-full">
            {totalExp?.years && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Years
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Years"
              value={totalExp?.years}
              onChange={(value) => {
                dispatch(
                  updateEmployeeData({
                    totalExp: { ...totalExp!, years: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {totalExp?.months && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Select Months
              </p>
            )}
            <Select<{ value: string; label: string } | null | undefined>
              options={year_month_array}
              className="w-full"
              placeholder="Select Months"
              value={totalExp?.months}
              onChange={(value) => {
                dispatch(
                  updateEmployeeData({
                    totalExp: { ...totalExp!, months: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
        </div>
        <br />
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
                  updateEmployeeData({
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
                  updateEmployeeData({
                    relevantExp: { ...relevantExp!, months: value! },
                  })
                );
              }}
              styles={reactSelectColorStyles}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTotalRelevantExp;
