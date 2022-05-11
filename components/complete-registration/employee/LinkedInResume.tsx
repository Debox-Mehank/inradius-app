import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { setLinkedIn } from '../../../features/registrationSlice'
import NextButton from '../NextButton'
import PageHeading from '../PageHeading'
import PrevButton from '../PrevButton'
import { api } from '../../../utils/AxiosClient'

const LinkedInResume = () => {
    const linkedin = useSelector((state: RootState) => state.registration.linkedin)
    const dispatch = useDispatch()

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitHandler = async (nextFunc: () => void) => {
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, isProfileComplete: true })
            router.push("/dashboard?type=employee")
    }

    const onSubmit = (values: any) => {
        console.log(values);
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-md w-full'>
                <PageHeading text={"LinkedIn & Resume"} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col w-full justify-start my-4`}>
                        <input type={"text"} className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`} placeholder={"Add LinkedIn Profile"} style={{ paddingTop: "9px", paddingBottom: "9px" }} value={linkedin ? linkedin : ""} onChange={(e) => dispatch(setLinkedIn(e.target.value))} />
                        {errors["linkedin"] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors["linkedin"]['message']}</p>
                        )}
                    </div>
                    <div className={`flex flex-col w-full justify-start`}>
                        <input type="file" className={`bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-gray-400 text-sm font-semibold w-full`} placeholder={"Upload Resume"} style={{ paddingTop: "9px", paddingBottom: "9px" }} {...register("resume", { required: "This field is required." })} />
                        {errors["resume"] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">{errors["resume"]['message']}</p>
                        )}
                    </div>
                    <div className='flex flex-row gap-2 justify-end select-none my-6'>
                        <PrevButton />
                        <NextButton onSubmit={onSubmitHandler} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LinkedInResume