import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, incrementStep } from "../../features/registrationSlice";
import { useRouter } from "next/router";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface NextButtonProps {
    onSubmit?: () => void
    validate?: boolean
    setShowError?: Dispatch<SetStateAction<boolean>>
}

const NextButton = ({ onSubmit, validate, setShowError }: NextButtonProps) => {
    const router = useRouter()
    const registration = useSelector((state: RootState) => state.registration)
    const dispatch = useDispatch();
    return (
        <div className={`${registration.currentStep === registration.steps.length ? 'w-max text-xs' : 'w-10'} h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`} onClick={() => {
            if (validate) {
                setShowError!(false)
                if (registration.progress.toFixed(1) !== "100.0") {
                    dispatch(incrementProgress())
                    dispatch(incrementStep())
                    if (registration.currentStep === registration.steps.length) {
                        if (onSubmit !== undefined) {
                            onSubmit()
                        }
                    } else {
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep])
                    }
                }
            } else {
                setShowError!(true)
            }
        }}>
            {registration.currentStep === registration.steps.length ? (
                "Submit"
            ) : (

                <FontAwesomeIcon icon={faChevronRight} size="sm" />
            )}
        </div>
    )
}

export default NextButton