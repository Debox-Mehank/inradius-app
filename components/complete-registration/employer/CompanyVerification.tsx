import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { setLetterHead, setLetterHeadFile, setLinkedIn, setStatus } from "../../../features/companyRegistrationSlice"
import PageHeading from "../PageHeading"

const CompanyVerification = () => {
    const linkedin = useSelector((state: RootState) => state.companyRegistration.linkedin)
    const letterhead = useSelector((state: RootState) => state.companyRegistration.letterhead)
    const status = useSelector((state: RootState) => state.companyRegistration.status)
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<any>({})

    const onSubmit = () => {
        console.log(linkedin, letterhead)
        if (!linkedin) {
            const errObj = { "linkedin": { message: "Please add your company's linkedin page." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                return err
            })
        }

        if (!letterhead) {
            const errObj = { "letterhead": { message: "Please add your company's letter head." } }
            setErrors((prev: any) => {
                const err = { ...errObj, ...prev }
                return err
            })
        }

        if (linkedin && letterhead) {
            setErrors({})
            dispatch(setStatus("verification in-progress"))
            // nextFunc()
            // TODO: perform submit action
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-sm w-full'>
                <PageHeading text="Company Verification" />
                {status === "verification pending" ? (
                    <>
                        <div className={`flex flex-col w-full justify-start my-4`}>
                            <input type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`} placeholder={"Add LinkedIn Profile"} style={{ paddingTop: "9px", paddingBottom: "9px" }} value={linkedin ? linkedin : ""} onChange={(e) => {
                                const errObj = errors
                                delete errObj['linkedin']
                                setErrors(errObj)
                                dispatch(setLinkedIn(e.target.value))
                            }} />
                            {errors["linkedin"] && (
                                <p className="text-xs text-red-500 px-1 font-medium py-1">{errors["linkedin"]['message']}</p>
                            )}
                        </div>
                        <div className={`flex flex-col w-full justify-start`}>
                            <input type="file" className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-gray-400 text-sm font-semibold w-full`} placeholder={"Upload Resume"} style={{ paddingTop: "9px", paddingBottom: "9px" }} value={letterhead ? letterhead : ""} onChange={(e) => {
                                const errObj = errors
                                delete errObj['letterhead']
                                setErrors(errObj)
                                dispatch(setLetterHead(e.target.value))
                                dispatch(setLetterHeadFile(e.target.files))
                            }} />
                            {errors["letterhead"] && (
                                <p className="text-xs text-red-500 px-1 font-medium py-1">{errors["letterhead"]['message']}</p>
                            )}
                        </div>
                        <div className='flex flex-row gap-2 justify-end select-none my-6'>
                            <button className={`w-max text-xs h-8 bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`} onClick={onSubmit}>Submit</button>
                        </div>
                    </>
                ) : status === "verification in-progress" ? (
                    <p className="text-sm w-full text-justify text-gray-500 font-medium mb-4">{"Your company's document is in process for verification. Once verification is done you'll be able to add your first job lisiting and continue."}</p>
                ) : null}
            </div>
        </div>
    )
}

export default CompanyVerification