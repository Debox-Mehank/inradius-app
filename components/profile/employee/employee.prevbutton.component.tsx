import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  decrementProgress,
  decrementStep,
  EMPLOYEE_STEPS,
  EMPLOYEE_STEPS_ENUM,
} from "../../../features/employee.slice";

interface EmployeePrevButtonProps {
  handlerFunction: (movePrev: () => void) => void;
}

const EmployeePrevButton = ({ handlerFunction }: EmployeePrevButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.employee.currentStep
  );
  const fresher = useSelector(
    (state: RootState) => state.employee.employee.fresher
  );

  const prevButtonHandler = () => {
    dispatch(decrementStep());
    dispatch(decrementProgress());
    var newStep = currentStep - 1;
    if (
      fresher &&
      EMPLOYEE_STEPS[newStep - 1] ===
        EMPLOYEE_STEPS_ENUM["total-relevant-experience"]
    ) {
      dispatch(decrementStep());
      dispatch(decrementProgress());
      newStep -= 1;
    }
    router.push(`/employee-profile?page=${EMPLOYEE_STEPS[newStep - 1]}`);
  };

  return (
    <button
      type="submit"
      className={`w-10 h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
      onClick={() => {
        handlerFunction(prevButtonHandler);
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} size="sm" />
    </button>
  );
};

export default EmployeePrevButton;
