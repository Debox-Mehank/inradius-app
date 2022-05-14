import router from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setFromPay, setToPay } from "../../../features/companyRegistrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { CurrentAndExpectedPay, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import NextCompanyButton from "../NextCompanyButton"
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'
import PrevCompanyButton from "../PrevCompanyButton"

const JobPay = () => {
    const payfrom = useSelector((state: RootState) => state.companyRegistration.frompay)
    const payto = useSelector((state: RootState) => state.companyRegistration.topay)
    const dispatch = useDispatch();
    const yearOptions: ReactSelectOptionType[] = [
        { label: "0 Lakh", value: "0" },
        { label: "1 Lakh", value: "1" },
        { label: "2 Lakh", value: "2" },
        { label: "3 Lakh", value: "3" },
        { label: "4 Lakh", value: "4" },
        { label: "5 Lakh", value: "5" },
        { label: "6 Lakh", value: "6" },
        { label: "7 Lakh", value: "7" },
        { label: "8 Lakh", value: "8" },
        { label: "9 Lakh", value: "9" },
        { label: "10 Lakh", value: "10" },
        { label: "11 Lakh", value: "11" },
        { label: "12 Lakh", value: "12" },
    ]

    const monthOptions: ReactSelectOptionType[] = [
        { label: "0 Thousand", value: "0" },
        { label: "1 Thousand", value: "1" },
        { label: "2 Thousand", value: "2" },
        { label: "3 Thousand", value: "3" },
        { label: "4 Thousand", value: "4" },
        { label: "5 Thousand", value: "5" },
        { label: "6 Thousand", value: "6" },
        { label: "7 Thousand", value: "7" },
        { label: "8 Thousand", value: "8" },
        { label: "9 Thousand", value: "9" },
        { label: "10 Thousand", value: "10" },
        { label: "11 Thousand", value: "11" },
        { label: "12 Thousand", value: "12" },
    ]

    const expectedPayLakh: ReactSelectOptionType[] = [
        { label: "5 Lakh", value: "5" },
        { label: "6 Lakh", value: "6" },
        { label: "7 Lakh", value: "7" },
        { label: "8 Lakh", value: "8" },
        { label: "9 Lakh", value: "9" },
        { label: "10 Lakh", value: "10" },
        { label: "11 Lakh", value: "11" },
        { label: "12 Lakh", value: "12" },
        { label: "12 Lakh", value: "12" },
        { label: "13 Lakh", value: "13" },
        { label: "14 Lakh", value: "14" },
        { label: "15 Lakh", value: "15" },
        { label: "16 Lakh", value: "16" },
        { label: "17 Lakh", value: "17" },
        { label: "18 Lakh", value: "18" },
        { label: "19 Lakh", value: "19" },
        { label: "20 Lakh", value: "20" },
        { label: "21 Lakh", value: "21" },
        { label: "22 Lakh", value: "22" },
        { label: "23 Lakh", value: "23" },
        { label: "24 Lakh", value: "24" },
        { label: "25 Lakh", value: "25" },
    ]

    const expectedPayThousand: ReactSelectOptionType[] = [
        { label: "0 Thousand", value: "0" },
        { label: "1 Thousand", value: "1" },
        { label: "2 Thousand", value: "2" },
        { label: "3 Thousand", value: "3" },
        { label: "4 Thousand", value: "4" },
        { label: "5 Thousand", value: "5" },
        { label: "6 Thousand", value: "6" },
        { label: "7 Thousand", value: "7" },
        { label: "8 Thousand", value: "8" },
        { label: "9 Thousand", value: "9" },
        { label: "10 Thousand", value: "10" },
        { label: "11 Thousand", value: "11" },
        { label: "12 Thousand", value: "12" },
    ]
    const [errors, setErrors] = useState<any>({})

    const onSubmit = (nextFunc: () => void) => {
        if (!payfrom) {
            const errObj = { "total pay": { message: "Please select your lower payscale." } }
            setErrors(errObj)
        } 
        else if (!payto) {
            const errObj = { "total pay": { message: "Please select your upper payscale." } }
            setErrors(errObj)
        } 
        else if(payfrom && payto) {
            const from = parseFloat(`${payfrom.lakhs?.value}.${payfrom.thousands?.value}`)
            const to = parseFloat(`${payto.lakhs?.value}.${payto.thousands?.value}`)
            if(from < to){
            setErrors({})
            router.push("/dashboard?type=employee")
            }
            else{
                const errObj = { "from to error": { message: "Please make your upper limit (to) higher than your lower limit (from)." } }
                setErrors(errObj) 
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
                        <Select<ReactSelectOptionType> options={expectedPayLakh} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Lakhs" value={payfrom?.lakhs} onChange={(value) => {
                                const relexp: CurrentAndExpectedPay = {
                                    lakhs: value!,
                                    thousands: payfrom?.thousands ?? null
                                }
                                dispatch(setFromPay(relexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={expectedPayThousand} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select Thousands" value={payfrom?.thousands} onChange={(value) => {
                                const relexp: CurrentAndExpectedPay = {
                                    lakhs: payfrom?.lakhs ?? null,
                                    thousands: value!
                                }
                                dispatch(setFromPay(relexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
                </div>
                    <br />
                    <p className={`text-md w-full text-left font-normal my-2`}>{"To"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Select<ReactSelectOptionType> options={yearOptions} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Lakhs" value={payto?.lakhs} onChange={(value) => {
                                const totexp: CurrentAndExpectedPay = {
                                    lakhs: value!,
                                    thousands: payto?.thousands ?? null
                                }
                                dispatch(setToPay(totexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={monthOptions} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select Thousands" value={payto?.thousands} onChange={(value) => {
                                const totexp: CurrentAndExpectedPay = {
                                    lakhs: payto?.lakhs ?? null,
                                    thousands: value!
                                }
                                dispatch(setToPay(totexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
                {errors['total pay'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['total experience']['message']}</p>
                )}
                {errors['expedted pay'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['relevant experience']['message']}</p>
                )}
                {errors['exp error'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['exp error']['message']}</p>
                )}
                {errors['from to error'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['from to error']['message']}</p>
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