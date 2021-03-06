import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, incrementStep, setFresher } from "../../features/registrationSlice";
import { useRouter } from "next/router";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface NextButtonProps {
    onSubmit?: (nextFunc: () => void) => void
    fresher?: boolean
}

const NextButton = ({ onSubmit, fresher }: NextButtonProps) => {
    const router = useRouter()
    const registration = useSelector((state: RootState) => state.registration)
    const dispatch = useDispatch();
    return (
        <button type="submit" className={`${registration.currentStep === registration.steps.length ? 'w-max text-xs' : 'w-10'} h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`} onClick={() => {
            const nextFunc = () => {
                if (registration.progress.toFixed(1) !== "100.0") {
                    if(fresher){
                    dispatch(incrementProgress())
                    dispatch(incrementStep())
                    dispatch(setFresher(false))
                    if (registration.currentStep !== registration.steps.length) {
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep])
                    }
                    }
                    else{
                    dispatch(incrementProgress())
                    dispatch(incrementStep())
                    if (registration.currentStep !== registration.steps.length) {
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep])
                    }
                }
                }
            }
            if (onSubmit) {
                onSubmit(nextFunc)
            } else {
                nextFunc()
            }
        }}>
            {registration.currentStep === registration.steps.length ? (
                "Submit"
            ) : (

                <FontAwesomeIcon icon={faChevronRight} size="sm" />
            )}
        </button>
    )
}

export default NextButton