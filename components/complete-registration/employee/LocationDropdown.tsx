import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setLocation } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const LocationDropdown = () => {
    const location = useSelector((state: RootState) => state.registration.location)
    const dispatch = useDispatch();

    const options: ReactSelectOptionType[] = [
        { label: "Mumbai", value: "Mumbai" }
    ]

    const [errors, setErrors] = useState<any>({})

    const onSubmit = (nextFunc: () => void) => {
        if (!location) {
            const errObj = { "location": { message: "Please select your location." } }
            setErrors(errObj)
        } else {
            setErrors({})
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
                    <PrevButton />
                    <NextButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default LocationDropdown