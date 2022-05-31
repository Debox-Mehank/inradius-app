import {
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  EMPLOYER_STEPS,
  EMPLOYER_STEPS_ENUM,
  incrementProgress,
  incrementStep,
} from "../../../features/employer.slice";

interface EmployerNextButtonProps {
  handlerFunction: (moveNext: () => void) => void;
}

const EmployerNextButton = ({ handlerFunction }: EmployerNextButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.employer.currentStep
  );

  const nextButtonHandler = () => {
    dispatch(incrementStep());
    dispatch(incrementProgress());
    var newStep = currentStep + 1;

    if (currentStep !== EMPLOYER_STEPS.length) {
      router.push(`/employer-profile?page=${EMPLOYER_STEPS[newStep - 1]}`);
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
      {currentStep === EMPLOYER_STEPS.length ? (
        <FontAwesomeIcon icon={faCheckCircle} size="sm" />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      )}
    </button>
  );
};

export default EmployerNextButton;
