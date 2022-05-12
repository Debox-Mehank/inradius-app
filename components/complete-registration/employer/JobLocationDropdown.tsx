import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setLocation } from "../../../features/companyRegistrationSlice"
import { api } from "../../../utils/AxiosClient"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import NextCompanyButton from "../NextCompanyButton"
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import PrevCompanyButton from "../PrevCompanyButton"

const JobLocationDropdown = () => {
    const location = useSelector((state: RootState) => state.companyRegistration.location)
    const dispatch = useDispatch();

    const options: ReactSelectOptionType[] = [
        { label: "Mumbai", value: "Mumbai" }
    ]

    const [errors, setErrors] = useState<any>({})

    const onSubmit = async (nextFunc: () => void) => {
        if (!location) {
            const errObj = { "location": { message: "Please select your location." } }
            setErrors(errObj)
        } else {
            setErrors({})
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, locationDropdown: location.value })
            console.log(response)
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Location" />
                <Select<ReactSelectOptionType> options={options} getOptionLabel={(location: ReactSelectOptionType) => location.label}
                    getOptionValue={(location: ReactSelectOptionType) => location.value} className="w-full" placeholder="Select Location..." value={location} onChange={(value) => {
                        setErrors({})
                        dispatch(setLocation(value!))
                    }} styles={reactSelectColorStyles} />
                {errors['location'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['location']['message']}</p>
                )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default JobLocationDropdown