import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setSkill1, setSkill2, setSkill3, setSkill4 } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectIndustryDependentOptionType, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const Skills = () => {
    const industry = useSelector((state: RootState) => state.registration.industry)

    const skill1 = useSelector((state: RootState) => state.registration.skill1)
    const skill2 = useSelector((state: RootState) => state.registration.skill2)
    const skill3 = useSelector((state: RootState) => state.registration.skill3)
    const skill4 = useSelector((state: RootState) => state.registration.skill4)

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
    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Skills & Expertise" />
                <div className="w-full flex flex-col gap-4">
                    <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                        getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select Skill 1..." value={skill1} onChange={(value) => dispatch(setSkill1(value!))} styles={reactSelectColorStyles} />
                    <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                        getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select Skill 2..." value={skill2} onChange={(value) => dispatch(setSkill2(value!))} styles={reactSelectColorStyles} />
                    <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                        getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select Skill 3..." value={skill3} onChange={(value) => dispatch(setSkill3(value!))} styles={reactSelectColorStyles} />
                    <Select<ReactSelectIndustryDependentOptionType> options={options.filter(el => el.industry === industry?.value)} getOptionLabel={(skill: ReactSelectIndustryDependentOptionType) => skill.label}
                        getOptionValue={(skill: ReactSelectIndustryDependentOptionType) => skill.value} className="w-full" placeholder="Select Skill 4..." value={skill4} onChange={(value) => dispatch(setSkill4(value!))} styles={reactSelectColorStyles} />
                </div>
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton />
                </div>
            </div>
        </div>
    )
}

export default Skills