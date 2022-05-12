import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setIndustry, setDomain } from "../../../features/companyRegistrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectIndustryDependentOptionType, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import { api } from "../../../utils/AxiosClient"
import PrevCompanyButton from "../PrevCompanyButton"
import NextCompanyButton from "../NextCompanyButton"

const JobIndustryDomain = () => {
    const industry = useSelector((state: RootState) => state.companyRegistration.industry)
    const domain = useSelector((state: RootState) => state.companyRegistration.domain)
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

    const [errors, setErrors] = useState<any>({})

    const onSubmit = async (nextFunc: () => void) => {
        if (!industry) {
            const errObj = { "industry": { message: "Please select your industry." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }

        if (!domain) {
            const errObj = { "domain": { message: "Please select your domain." }, ...errors }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }

        if (industry && domain) {
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, industry: industry.value, domain: domain.value })
            setErrors({})
            nextFunc()
        }
    }
    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Industry & Domain" />
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full">
                        <Select<ReactSelectOptionType> options={industryOptions} getOptionLabel={(industry: ReactSelectOptionType) => industry.label}
                            getOptionValue={(industry: ReactSelectOptionType) => industry.value} className="w-full" placeholder="Select Industry..." value={industry} onChange={(value) => {
                                const errObj = errors
                                delete errObj['industry']
                                setErrors(errObj)
                                dispatch(setIndustry(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['industry'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['industry']['message']}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <Select<ReactSelectIndustryDependentOptionType> options={industry ? domainOptions.filter(el => el.industry === industry.value) : []} getOptionLabel={(domain: ReactSelectIndustryDependentOptionType) => domain.label}
                            getOptionValue={(domain: ReactSelectIndustryDependentOptionType) => domain.value} className="w-full" placeholder="Select Domain..." value={domain} onChange={(value) => {
                                const errObj = errors
                                delete errObj['domain']
                                setErrors(errObj)
                                dispatch(setDomain(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['domain'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['domain']['message']}</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default JobIndustryDomain