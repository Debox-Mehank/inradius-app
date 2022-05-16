import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setCurrentPay, setExpectedPay, setRelevantExp } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import {ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const CurrentAndExpectedPay = () => {
    const numWords = require('num-words')
    const currentpay = useSelector((state: RootState) => state.registration.currentpay)
    const expectedpay = useSelector((state: RootState) => state.registration.expectedpay)
    const fresher = useSelector((state: RootState) => state.registration.fresher)
    const [currentPayString, setCurrentPayString] = useState<string>(currentpay === null ? "0": numWords(parseInt(currentpay)))
    const [expectedPayString, setExpectedPayString] = useState<string>(expectedpay === null ? "0" : numWords(parseInt(expectedpay)))
    const [cPay, setCPay] = useState<number>(currentpay === null ? 0 : parseInt(currentpay))
    const [ePay, setEPay] = useState<number>(expectedpay === null ? 0 :parseInt(expectedpay))
    console.log(fresher)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<any>({})

    const onSubmit = (nextFunc: () => void) => {
        if (cPay === 0 || cPay === undefined || cPay === null || currentPayString === "" || currentPayString === undefined || currentPayString === null) {
            const errObj = { "total pay": { message: "Please enter your current pay." } }
            setErrors(errObj)
        } 
        else if(ePay === 0 || ePay === undefined || ePay === null || expectedPayString === "" || expectedPayString === undefined || expectedPayString === null){
            console.log("fresher",expectedPayString.length)
            const errObj = { "expected pay": { message: "Please enter your expected pay." } }
            setErrors(errObj) 
        }
        else if(cPay !== 0 && fresher){
            setErrors({})
            nextFunc()
        }
        else if(ePay !== 0 && ePay!== 0 && !fresher){
            console.log("fresher 123",fresher)

            if(cPay > ePay){
            const errObj = { "expected lower" : {message: "Please make your expected pay higher than your current pay."}}
            setErrors(errObj) 
            }
            else {
            setErrors({})
            nextFunc()
            }
        }
    }
    

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-md w-full'>
                <PageHeading text={!fresher ? "Current & Expected Annual Pay" : "Expected Pay"} />
                {!fresher ? <><div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Current Pay"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <input type={"number"} className={`w-full bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold`} placeholder={"Please enter your current annual pay"} value={(cPay !== 0 && String(cPay).length < 10) ? cPay : ""} onChange={(e) => {
                                    if(e.target.value.length < 10){
                                        console.log(String(cPay).length)
                                    setCPay(parseInt(e.target.value))
                                    setCurrentPayString(numWords(parseInt(e.target.value)))
                                    dispatch(setCurrentPay(e.target.value));
                                    }
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                    </div>
                </div>
                </>: null}
                {!fresher ? <div className="text-sm my-5">Current Pay is {currentPayString}</div> : null}
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Expected Pay"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                    <input type={"number"} className={`w-full bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold`} placeholder={"Please enter your expected annual pay"} value={(ePay !== 0 && String(ePay).length < 10) ? ePay : ""} onChange={(e) => {
                                    if(e.target.value.length < 10){
                                    setEPay(parseInt(e.target.value))
                                    setExpectedPayString(numWords(parseInt(e.target.value)))
                                    dispatch(setExpectedPay(e.target.value))
                                    }
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                    </div>
                </div>
                <div className="text-sm my-5">Expected Pay is {expectedPayString}</div>
                {!fresher ? errors['total pay'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['total pay']['message']}</p>
                ): null}
                {errors['expected pay'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['expected pay']['message']}</p>
                )}
                {!fresher ? errors['expected lower'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['expected lower']['message']}</p>
                ): null}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton fresher={fresher}/>
                    <NextButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
export default CurrentAndExpectedPay