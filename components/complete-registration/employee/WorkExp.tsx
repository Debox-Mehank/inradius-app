import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { addWorkExp, removeWorkExp, setCompany, setDesignation, setEnd, setDescription, setStart } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import TextButton from "../../reusables/TextButton"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const WorkExp = () => {
    const workexp = useSelector((state: RootState) => state.registration.workexp)
    const dispatch = useDispatch();

    const options: ReactSelectOptionType[] = [
        { label: "Manager", value: "Manager" },
        { label: "Director", value: "Director" },
        { label: "Senior Developer", value: "Senior Developer" },
        { label: "Junior Developer", value: "Junior Developer" },
        { label: "Lead Designer", value: "Lead Designer" }
    ]

    const [errors, setErrors] = useState<any>({})
    const [current, setCurrent] = useState<any>(false)
    const onSubmit = (nextFunc: () => void) => {
        console.log(workexp);
        if (!workexp) {
            const errObj = { "qualification": { message: "Please select your qualification." } }
            setErrors(errObj)
        } else {
            setErrors({})
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-screen-lg px-2 w-full overflow-y-scroll'>
                <PageHeading text="Past Work Experience" desc={"You can add upto 3 experiences!"} />
                <div className="flex flex-col gap-4">
                    {workexp.map((exp, idx) => {
                        return (
                            <div key={idx} className="w-full flex flex-col justify-between gap-4 items-center pb-8">
                                <input type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-3/4`} placeholder={"Company Name"} value={exp.company ?? ""} onChange={(e) => {
                                    dispatch(setCompany({ idx, company: e.target.value }))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <Select<ReactSelectOptionType> options={options} getOptionLabel={(location: ReactSelectOptionType) => location.label} getOptionValue={(location: ReactSelectOptionType) => location.value} className="w-3/4 font-semibold" placeholder="Select Designation..." value={exp.designation} onChange={(value) => {
                                    dispatch(setDesignation({ idx, designation: value! }))
                                }} styles={reactSelectColorStyles} />
                                <textarea className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none h-[5rem] text-sm font-semibold w-3/4`} placeholder={"Role Description"} value={exp.description ?? ""} onChange={(e) => {
                                    dispatch(setDescription({ idx, description: e.target.value }))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <input type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-3/4`} placeholder={"Start Date (mm/yyyy)"} value={exp.start ?? ""} onChange={(e) => {
                                    dispatch(setStart({ idx, start: e.target.value }))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <input disabled={current === true ? true : false} type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-3/4 ${current === true ? "cursor-not-allowed" : ""}`} placeholder={"End Date (mm/yyyy)"} value={exp.end ?? ""} onChange={(e) => {
                                    dispatch(setEnd({ idx, end: e.target.value }))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <div className="flex align-middle items-center justify-start " onClick={() => setCurrent((prev : any) => !prev)}><input type={"checkbox"} id="working" value={current} onClick={() => setCurrent((prev : any) => !prev)}/><label className="text-sm pl-2">Currently Working Here</label></div>
                        </div>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row gap-4 w-full justify-center items-center">
                    {workexp.length > 1 && (
                        <button className={`text-sm font-medium text-primary my-4`} onClick={() => {
                            dispatch(removeWorkExp())
                        }}>
                            <FontAwesomeIcon icon={faCircleMinus} className="text-primary px-2" size="sm" />
                            Remove
                        </button>
                    )}
                    <button disabled={workexp.length === 3} className={`text-sm font-medium text-primary my-4 ${workexp.length === 3 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                        dispatch(addWorkExp())
                    }}>
                        <FontAwesomeIcon icon={faCirclePlus} className="text-primary px-2" size="sm" />
                        Add New
                    </button>
                    </div>
                    <div className="flex align-middle items-center justify-start text-sm">If you are a Fresher and are looking to gain some experience, please <TextButton onSubmit={onSubmit}/> to skip this section</div>
                </div>
                
                <div className='flex flex-row gap-2 justify-center select-none my-6'>
                    <PrevButton />
                    <NextButton fresher={true} onSubmit={onSubmit} />
                </div>
            </div>
        </div >
    )
}

export default WorkExp