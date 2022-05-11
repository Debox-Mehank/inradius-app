import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setQualification } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import { api } from "../../../utils/AxiosClient"

const Qualifications = () => {
    const qualification = useSelector((state: RootState) => state.registration.qualification)
    const dispatch = useDispatch();

    const options: ReactSelectOptionType[] = [
        { label: "10th", value: "10th" },
        { label: "12th", value: "12th" },
        { label: "Bachelor", value: "Bachelor" },
        { label: "Masters", value: "Masters" },
        { label: "PhD", value: "PhD" }
    ]

    const [errors, setErrors] = useState<any>({})

    const onSubmit = async(nextFunc: () => void) => {
        if (!qualification) {
            const errObj = { "qualification": { message: "Please select your qualification." } }
            setErrors(errObj)
        } else {
            setErrors({})
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, qual: qualification.value})
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Educational Qualifications" />
                <Select<ReactSelectOptionType> options={options} getOptionLabel={(qualification: ReactSelectOptionType) => qualification.label}
                    getOptionValue={(qualification: ReactSelectOptionType) => qualification.value} className="w-full" placeholder="Select Qualification..." value={qualification} onChange={(value) => {
                        setErrors({})
                        dispatch(setQualification(value!))
                    }} styles={reactSelectColorStyles} />
                {errors['qualification'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['qualification']['message']}</p>
                )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Qualifications