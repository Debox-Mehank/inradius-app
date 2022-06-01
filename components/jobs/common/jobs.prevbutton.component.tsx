import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  JOB_STEPS,
  decrementStep,
  decrementProgress,
} from "../../../features/job.slice";

interface JobDetailsPrevButtonProps {
  handlerFunction: (moveNext: () => void) => void;
}

const JobDetailsPrevButton = ({
  handlerFunction,
}: JobDetailsPrevButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.job.currentStep);
  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevButtonHandler = () => {
    dispatch(decrementStep());
    dispatch(decrementProgress());
    var newStep = currentStep - 1;
    router.push(`/job-details?page=${JOB_STEPS[newStep - 1]}&jobId=${jobId}`);
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

export default JobDetailsPrevButton;
