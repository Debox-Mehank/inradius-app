import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setIndustry, setDomain } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectIndustryDependentOptionType, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const IndustryDomain = () => {
    const industry = useSelector((state: RootState) => state.registration.industry)
    const domain = useSelector((state: RootState) => state.registration.domain)
    const dispatch = useDispatch();

    const industryOptions: ReactSelectOptionType[] = [
        { label: "Tech", value: "Tech" },
        { label: "Design", value: "Design" },
        { label: "Marketing", value: "Marketing" }
    ]

    const domainOptions: ReactSelectIndustryDependentOptionType[] = [
        { label: "Front End", value: "Front End", industry: "Tech" },
        { label: "Back End", value: "Back End", industry: "Tech" },
        { label: "Full Stack", value: "Full Stack", industry: "Tech" },
        { label: "UI Design", value: "UI Design", industry: "Design" },
        { label: "UX", value: "UX", industry: "Design" },
        { label: "Content Creator", value: "Content Creator", industry: "Marketing" },
        { label: "Social Media", value: "Content Creator", industry: "Marketing" },
        { label: "Branding", value: "Branding", industry: "Marketing" },
    ]
    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Industry & Domain" />
                <div className="w-full flex flex-col gap-4">
                    <Select<ReactSelectOptionType> options={industryOptions} getOptionLabel={(industry: ReactSelectOptionType) => industry.label}
                        getOptionValue={(industry: ReactSelectOptionType) => industry.value} className="w-full" placeholder="Select Industry..." value={industry} onChange={(value) => dispatch(setIndustry(value!))} styles={reactSelectColorStyles} />
                    <Select<ReactSelectIndustryDependentOptionType> options={industry ? domainOptions.filter(el => el.industry === industry.value) : []} getOptionLabel={(domain: ReactSelectIndustryDependentOptionType) => domain.label}
                        getOptionValue={(domain: ReactSelectIndustryDependentOptionType) => domain.value} className="w-full" placeholder="Select Domain..." value={domain} onChange={(value) => dispatch(setDomain(value!))} styles={reactSelectColorStyles} />
                </div>
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton />
                </div>
            </div>
        </div>
    )
}

export default IndustryDomain