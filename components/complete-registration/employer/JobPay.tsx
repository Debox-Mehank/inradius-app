import { fromError } from "@apollo/client"
import router from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setFromPay, setToPay } from "../../../features/companyRegistrationSlice"
import { api } from "../../../utils/AxiosClient"
import { reactSelectColorStyles } from "../../../utils/common"
import { CurrentAndExpectedPay, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import NextCompanyButton from "../NextCompanyButton"
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import PrevCompanyButton from "../PrevCompanyButton"

const JobPay = () => {
    const numWords = require('num-words')
    const payfrom = useSelector((state: RootState) => state.companyRegistration.frompay)
    const payto = useSelector((state: RootState) => state.companyRegistration.topay)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<any>({})
    const [toPayString, setToPayString] = useState<string>(payto === null ? "0": numWords(parseInt(payto)))
    const [fromPayString, setFromPayString] = useState<string>(payfrom === null ? "0" : numWords(parseInt(payfrom)))
    const [tPay, setTPay] = useState<number>(payto === null ? 0 : parseInt(payto))
    const [fPay, setFPay] = useState<number>(payfrom === null ? 0 :parseInt(payfrom))
    const onSubmit = async(nextFunc: () => void) => {
        if (fPay === 0 || fPay === undefined || fPay === null || fromPayString === "" || fromPayString === undefined || fromPayString === null) {
            const errObj = { "from pay": { message: "Please select your lower payscale." } }
            setErrors(errObj)
        } 
        else if(tPay === 0 || tPay === undefined || tPay === null || toPayString === "" || toPayString === undefined || toPayString === null){
            const errObj = { "to pay": { message: "Please select your upper payscale." } }
            setErrors(errObj) 
        }
        else if(tPay !== 0 && fPay!== 0){
            console.log(tPay, fPay)
            if(tPay < fPay){
            const errObj = { "from to error" : {message: "Please make your upper limit (to) higher than your lower limit (from)."}}
            setErrors(errObj) 
            }
            else {
            const id = localStorage.getItem("id")
            const response = await api.post("update", { id, toPay: tPay, fromPay: fPay })
            setErrors({})
            router.push("/dashboard?type=employer")
            }
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-md w-full'>
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Payscale"}</p>
                    <p className={`text-md w-full text-left font-normal my-2`}>{"From"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                    <input type={"number"} className={`w-full bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold`} placeholder={"Please enter your current annual pay"} value={(fPay !== 0 && String(fPay).length < 10) ? fPay : ""} onChange={(e) => {
                                    if(e.target.value.length < 10){
                                        console.log(String(tPay).length)
                                    setFPay(parseInt(e.target.value))
                                    setFromPayString(numWords(parseInt(e.target.value)))
                                    dispatch(setFromPay(e.target.value));
                                    }
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                    </div>
                </div>
                <div className="text-sm my-5">From Pay is {fromPayString}</div>
                    <p className={`text-md w-full text-left font-normal my-2`}>{"To"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                    <input type={"number"} className={`w-full bg-lightGray px-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold`} placeholder={"Please enter your expected annual pay"} value={(tPay !== 0 && String(tPay).length < 10) ? tPay : ""} onChange={(e) => {
                                    if(e.target.value.length < 10){
                                    setTPay(parseInt(e.target.value))
                                    setToPayString(numWords(parseInt(e.target.value)))
                                    dispatch(setToPay(e.target.value))
                                    }
                                }} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                    </div>
                <div className="text-sm my-5">To Pay is {toPayString}</div>
                {errors['to pay'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['to pay']['message']}</p>
                )}
                {errors['from pay'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['from pay']['message']}</p>
                )}
                {errors['from to error'] && (
                    <p className="text-xs text-red-500 px-0 font-medium py-1">{errors['from to error']['message']}</p>
                )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton onSubmit={onSubmit} />
                </div>
            </div>
            </div>
        
    )
}

export default JobPay