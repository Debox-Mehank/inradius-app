import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, incrementStep, setFresher } from "../../features/registrationSlice";
import { useRouter } from "next/router";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface NextButtonProps {
    onSubmit?: (nextFunc: () => void) => void
}

const TextButton = ({ onSubmit }: NextButtonProps) => {
    const router = useRouter()
    const registration = useSelector((state: RootState) => state.registration)
    const dispatch = useDispatch();
    return (
        <p className={`text-center cursor-pointer text-red-500 font-medium text-sm py-2`} onClick={() => {
            const nextFunc = () => {
                if (registration.progress.toFixed(1) !== "100.0") {
                    dispatch(incrementProgress())
                    dispatch(incrementProgress())
                    dispatch(incrementStep())
                    dispatch(incrementStep())
                    dispatch(setFresher(true))
                    if (registration.currentStep !== registration.steps.length) {
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep+1])
                    }
                }
            }
            if (onSubmit) {
                onSubmit(nextFunc)
            } else {
                nextFunc()
            }
        }}>
            &nbsp;Click here&nbsp;
        </p>
    )
}

export default TextButton