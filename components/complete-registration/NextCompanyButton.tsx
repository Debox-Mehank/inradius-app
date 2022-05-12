import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, incrementStep } from "../../features/companyRegistrationSlice";
import { useRouter } from "next/router";
import { RootState } from "../../app/store";
import { Dispatch, SetStateAction } from "react";

interface NextButtonProps {
    onSubmit?: (nextFunc: () => void) => void
}

const NextCompanyButton = ({ onSubmit }: NextButtonProps) => {
    const router = useRouter()
    const registration = useSelector((state: RootState) => state.companyRegistration)
    const dispatch = useDispatch();
    return (
        <button type="submit" className={`${registration.currentStep === registration.steps.length ? 'w-max text-xs' : 'w-10'} h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`} onClick={() => {
            const nextFunc = () => {
                if (registration.progress.toFixed(1) !== "100.0") {
                    dispatch(incrementProgress())
                    dispatch(incrementStep())
                    if (registration.currentStep !== registration.steps.length) {
                        router.push("/complete-verification?page=" + registration.steps[registration.currentStep])
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

export default NextCompanyButton