import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setSkill1, setSkill2, setSkill3, setSkill4 } from "../../../features/companyRegistrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectIndustryDependentOptionType, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import { api } from "../../../utils/AxiosClient"
import PrevCompanyButton from "../PrevCompanyButton"
import NextCompanyButton from "../NextCompanyButton"
const JobSkills = () => {
    const industry = useSelector((state: RootState) => state.companyRegistration.industry)
    const skill1 = useSelector((state: RootState) => state.companyRegistration.skill1)
    const skill2 = useSelector((state: RootState) => state.companyRegistration.skill2)
    const skill3 = useSelector((state: RootState) => state.companyRegistration.skill3)
    const skill4 = useSelector((state: RootState) => state.companyRegistration.skill4)

    const dispatch = useDispatch();

    const options: ReactSelectIndustryDependentOptionType[] = [
        // Tech Skills
        { label: "HTML", value: "HTML", industry: "Tech" },
        { label: "CSS", value: "CSS", industry: "Tech" },
        { label: "JavaScript", value: "JavaScript", industry: "Tech" },
        { label: "TypeScript", value: "TypeScript", industry: "Tech" },
        { label: "React JS", value: "React JS", industry: "Tech" },
        { label: "Node JS", value: "Node JS", industry: "Tech" },
        { label: "PHP", value: "PHP", industry: "Tech" },
        { label: "Go", value: "Go", industry: "Tech" },
        // Design
        { label: "Photoshop", value: "Photoshop", industry: "Design" },
        { label: "Illustrator", value: "Illustrator", industry: "Design" },
        { label: "XD", value: "XD", industry: "Design" },
        { label: "Figma", value: "Figma", industry: "Design" },
        { label: "After Effects", value: "After Effects", industry: "Design" },
        { label: "After Effects", value: "After Effects", industry: "Design" },
        // Marketing
        { label: "Excel", value: "Excel", industry: "Marketing" },
        { label: "Powerpoint", value: "Powerpoint", industry: "Marketing" },
        { label: "Mailchimp", value: "Mailchimp", industry: "Marketing" },
        { label: "Facebook Ads", value: "Facebook Ads", industry: "Marketing" },
    ]

    const [errors, setErrors] = useState<any>({})

    const onSubmit = async (nextFunc: () => void) => {
        if (!skill1) {
            const errObj = { "skill1": { message: "This field is required." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }
        if (!skill2) {
            const errObj = { "skill2": { message: "This field is required." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }
        if (!skill3) {
            const errObj = { "skill3": { message: "This field is required." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }
        if (!skill4) {
            const errObj = { "skill4": { message: "This field is required." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                console.log(err);
                return err
            })
        }

        if(skill1 && skill2 && skill3 && skill4 && ((skill1.value === skill2.value) || (skill1.value === skill2.value) || (skill1.value === skill3.value) || (skill1.value === skill4.value) || (skill2.value === skill3.value) || (skill3.value === skill4.value) || (skill2.value === skill4.value))){
            const errObj = {"repeat": {message: "Skills cannot be repeated"}}
            setErrors((prev: any) => {
                const err = {...errObj, ...prev}
                return err
            }) 
        }

        else if (skill1 && skill2 && skill3 && skill4) {
            setErrors({})
            const id = localStorage.getItem("id")
            await api.post("update", { id, skill1: skill1.value, skill2: skill2.value, skill3: skill3.value, skill4: skill4.value})
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text={"Skills & Expertise"} />
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full">
                        <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                            getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select your top skill here" value={skill1} onChange={(value) => {
                                const errObj = errors
                                delete errObj['repeat']
                                delete errObj['skill1']
                                setErrors(errObj)
                                dispatch(setSkill1(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['skill1'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['skill1']['message']}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                            getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select your 2nd top skill here" value={skill2} onChange={(value) => {
                                const errObj = errors
                                delete errObj['repeat']
                                delete errObj['skill2']
                                setErrors(errObj)
                                dispatch(setSkill2(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['skill2'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['skill2']['message']}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                            getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select your 3rd top skill here" value={skill3} onChange={(value) => {
                                const errObj = errors
                                delete errObj['repeat']
                                delete errObj['skill3']
                                setErrors(errObj)
                                dispatch(setSkill3(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['skill3'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['skill3']['message']}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                            getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select your 4th top skill here" value={skill4} onChange={(value) => {
                                const errObj = errors
                                delete errObj['repeat']
                                delete errObj['skill4']
                                setErrors(errObj)
                                dispatch(setSkill4(value!))
                            }} styles={reactSelectColorStyles} />
                        {errors['skill4'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['skill4']['message']}</p>
                        )}
                    </div>
                </div>
                {errors['repeat'] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['repeat']['message']}</p>
                        )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default JobSkills