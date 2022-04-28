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

    const [showError, setShowError] = useState(false)

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Location" />
                <Select<ReactSelectOptionType> options={options} getOptionLabel={(location: ReactSelectOptionType) => location.label}
                    getOptionValue={(location: ReactSelectOptionType) => location.value} className="w-full" placeholder="Select Location..." value={location} onChange={(value) => dispatch(setLocation(value!))} styles={reactSelectColorStyles} />
                {showError && location === null && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{"Please select your location."}</p>
                )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton validate={location ? true : false} setShowError={setShowError} />
                </div>
            </div>
        </div>
    )
}

export default LocationDropdown