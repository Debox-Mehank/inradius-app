import {
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  EMPLOYEE_STEPS,
  EMPLOYEE_STEPS_ENUM,
  incrementProgress,
  incrementStep,
} from "../../../features/employee.slice";

interface EmployeeNextButtonProps {
  handlerFunction: (moveNext: () => void) => void;
}

const EmployeeNextButton = ({ handlerFunction }: EmployeeNextButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.employee.currentStep
  );
  const fresher = useSelector(
    (state: RootState) => state.employee.employee.fresher
  );

  const nextButtonHandler = () => {
    dispatch(incrementStep());
    dispatch(incrementProgress());
    var newStep = currentStep + 1;

    if (
      fresher &&
      EMPLOYEE_STEPS[newStep - 1] ===
        EMPLOYEE_STEPS_ENUM["total-relevant-experience"]
    ) {
      dispatch(incrementStep());
      dispatch(incrementProgress());
      newStep += 1;
    }

    if (currentStep !== EMPLOYEE_STEPS.length) {
      router.push(`/employee-profile?page=${EMPLOYEE_STEPS[newStep - 1]}`);
    }
  };

  return (
    <button
      type="submit"
      className={`w-10 h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
      onClick={() => {
        handlerFunction(nextButtonHandler);
      }}
    >
      {currentStep === EMPLOYEE_STEPS.length ? (
        <FontAwesomeIcon icon={faCheckCircle} size="sm" />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      )}
    </button>
  );
};

export default EmployeeNextButton;
