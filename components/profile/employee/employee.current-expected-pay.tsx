import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { useUpdateEmployeeMutation } from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const numWords = require("num-words");

const EmployeeCurrentExpectedPay = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const fresher = useSelector(
    (state: RootState) => state.employee.employee.fresher
  );

  const expectedPay = useSelector(
    (state: RootState) => state.employee.employee.expectedPay
  );
  const currentPay = useSelector(
    (state: RootState) => state.employee.employee.currentPay
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
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
        input: { currentPay: currentPay, expectedPay: expectedPay },
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
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text="Salary Details" />
        {!fresher && (
          <div className="flex justify-start flex-col">
            <PageSubHeading text={"Current Pay"} />
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"₹ 1,000,000"}
              autoComplete="off"
              value={currentPay ?? ""}
              maxLength={9}
              onChange={(e) => {
                if (e.target.value !== "") {
                  if (e.target.value.length <= 9) {
                    dispatch(
                      updateEmployeeData({
                        currentPay: parseInt(e.target.value),
                      })
                    );
                  }
                } else {
                  dispatch(
                    updateEmployeeData({
                      currentPay: null,
                    })
                  );
                }
              }}
            />
            {currentPay && currentPay !== null && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mt-2 capitalize">
                {numWords(currentPay)}
              </p>
            )}
          </div>
        )}
        <div className="flex justify-start flex-col">
          <PageSubHeading text={"Expected Pay"} />
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
                    updateEmployeeData({
                      expectedPay: parseInt(e.target.value),
                    })
                  );
                }
              } else {
                dispatch(
                  updateEmployeeData({
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
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCurrentExpectedPay;
