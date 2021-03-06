import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import {setDesc, setDesignation, setJoiningDate} from "../../../features/companyRegistrationSlice"
import { api } from "../../../utils/AxiosClient"
import { reactSelectColorStyles } from "../../../utils/common"
import { ReactSelectOptionType } from "../../../utils/custom_types"
import NextCompanyButton from "../NextCompanyButton"
import PageHeading from "../PageHeading"
import PrevCompanyButton from "../PrevCompanyButton"

const JobDesc = () => {
    const desc = useSelector((state: RootState) => state.companyRegistration.desc)
    let title = String(useSelector((state: RootState) => state.companyRegistration.designation))
    let joining = String(useSelector((state: RootState) => state.companyRegistration.joiningdate))
    if(title === "null"){
        title = ""
    }
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<any>({})
    const [current, setCurrent] = useState<any>(false)
    const onSubmit = async(nextFunc: () => void) => {
        if(title.length === 0){
            setErrors({"title": {message: "Please enter the job title"}})
        }
        else if(!desc){
            setErrors({"desc": { message: "Please enter the job description"}})
        }
        else if(!joining){
            setErrors({"joining": { message: "Please select the joining date"}})
        }
        // else if(joining){
        //     console.log(new Date.now())
        // }
        else{
            console.log("title",title.length)
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, jobTitle: title, jobDesc: desc })
            console.log(response)
            setErrors("")
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-screen-lg px-2 w-full overflow-y-scroll'>
                <PageHeading text="Job Title and Description"/>
                <div className="flex flex-col gap-4">
                            <div className="w-full flex flex-col justify-between gap-4 items-center pb-8">
                                <input type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-3/4`} placeholder={"Senior Manager - Human Resources"} value={title ?? ""} onChange={(e) => {
                                    dispatch(setDesignation(String(e.target.value)))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <textarea className={`bg-lightGray px-2 lg:px-4 h-[16rem] rounded-md focus-visible:outline-none text-sm font-semibold w-3/4`} placeholder={"Job Description"} value={desc ?? ""} onChange={(e) => {
                                    dispatch(setDesc(String(e.target.value)))
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                                <input type={"text"} min={new Date().toISOString().slice(0, 10)} onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "date")} style={{paddingTop: "9px", paddingBottom: "9px"}} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-3/4`} placeholder={"Expected Joining Date"} value={joining === "null" ? "" : joining} onChange={(e) => {
                                    dispatch(setJoiningDate(String(e.target.value)))
                                }}/>
                        </div>
                </div>
                <div className="text-center">
                {errors['title'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['title']['message']}</p>
                )}
                {errors['desc'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['desc']['message']}</p>
                )}
                {errors['joining'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['desc']['message']}</p>
                )}
                </div>
                <div className='flex flex-row gap-2 justify-center select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton onSubmit={onSubmit} />
                </div>
            </div>
        </div >
    )
}

export default JobDesc