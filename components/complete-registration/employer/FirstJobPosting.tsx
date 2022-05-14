import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, incrementStep } from "../../../features/companyRegistrationSlice";
import { useRouter } from "next/router";
import { RootState } from "../../../app/store";
import { Dispatch, SetStateAction } from "react";
import Confetti from 'react-confetti'

function FirstJobPosting() {
    const router = useRouter()
    const registration = useSelector((state: RootState) => state.companyRegistration)
    const dispatch = useDispatch();
    const [rec, setRec] = useState(true)
    setTimeout(() => setRec(false), 5000)
  return (
    <div className='flex flex-col justify-center items-center h-full font-semibold text-center'>
    <Confetti width={1200} height={780} numberOfPieces={600} recycle={rec}/>
    Congratulations on being verified! <br />We are delighted that you choose inRadius to help you in your employee hunting process.
    <div className="cursor-pointer text-primary inline-block flex flex-row"> <div onClick={() => {
                    const nextFunc = () => {
                        if (registration.progress.toFixed(1) !== "100.0") {
                            dispatch(incrementProgress())
                            dispatch(incrementStep())
                            if (registration.currentStep !== registration.steps.length) {
                                router.push("/complete-verification?page=" + registration.steps[registration.currentStep])
                            }
                        }
                    }

                        nextFunc()

    }}>Click here</div><div className='text-black'>&nbsp;to post your first job</div></div>
    {/* {page === "upload-documents" && (
        <CompanyVerification />
    )} */}
</div>
  )
}

export default FirstJobPosting