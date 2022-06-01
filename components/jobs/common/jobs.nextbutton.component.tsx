import {
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  JOB_STEPS,
  incrementProgress,
  incrementStep,
} from "../../../features/job.slice";

interface JobDetailsNextButtonProps {
  handlerFunction: (moveNext: () => void) => void;
}

const JobDetailsNextButton = ({
  handlerFunction,
}: JobDetailsNextButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.job.currentStep);
  const jobId = useSelector((state: RootState) => state.job.job._id);

  const nextButtonHandler = () => {
    dispatch(incrementStep());
    dispatch(incrementProgress());
    var newStep = currentStep + 1;

    if (currentStep !== JOB_STEPS.length) {
      router.push(`/job-details?page=${JOB_STEPS[newStep - 1]}&jobId=${jobId}`);
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
      {currentStep === JOB_STEPS.length ? (
        <FontAwesomeIcon icon={faCheckCircle} size="sm" />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      )}
    </button>
  );
};

export default JobDetailsNextButton;
