import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setQualification } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

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

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Educational Qualifications" />
                <Select<ReactSelectOptionType> options={options} getOptionLabel={(qualification: ReactSelectOptionType) => qualification.label}
                    getOptionValue={(qualification: ReactSelectOptionType) => qualification.value} className="w-full" placeholder="Select Qualification..." value={qualification} onChange={(value) => dispatch(setQualification(value!))} styles={reactSelectColorStyles} />
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton />
                </div>
            </div>
        </div>
    )
}

export default Qualifications