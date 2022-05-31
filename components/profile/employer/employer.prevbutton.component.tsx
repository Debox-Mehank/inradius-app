import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  decrementProgress,
  decrementStep,
  EMPLOYER_STEPS,
} from "../../../features/employer.slice";

interface EmployerPrevButtonProps {
  handlerFunction: (movePrev: () => void) => void;
}

const EmployerPrevButton = ({ handlerFunction }: EmployerPrevButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.employer.currentStep
  );

  const prevButtonHandler = () => {
    dispatch(decrementStep());
    dispatch(decrementProgress());
    var newStep = currentStep - 1;
    router.push(`/employer-profile?page=${EMPLOYER_STEPS[newStep - 1]}`);
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

export default EmployerPrevButton;
