import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { decrementProgress, decrementStep } from "../../features/registrationSlice"
import { useRouter } from "next/router"

const PrevButton = ({fresher} : any) => {
    const router = useRouter()

    const registration = useSelector((state: RootState) => state.registration)
    const dispatch = useDispatch();

    return (
        <>
            {registration.progress > 10 && (
                <div className="w-10 h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer" onClick={() => {
                    if (registration.progress > 10) {
                        if(fresher){
                        dispatch(decrementProgress())
                        dispatch(decrementStep())
                        dispatch(decrementProgress())
                        dispatch(decrementStep())
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep - 3])
                        }
                        else{
                        dispatch(decrementProgress())
                        dispatch(decrementStep())
                        router.push("/complete-registration?page=" + registration.steps[registration.currentStep - 2])
                    }}
                }}>
                    <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                </div>
            )}
        </>
    )
}

export default PrevButton