import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setCurrentPay, setExpectedPay, setRelevantExp } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { CurrentAndExpectedPay, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const CurrentAndExpectedPay = () => {
    const currentpay = useSelector((state: RootState) => state.registration.currentpay)
    const expectedpay = useSelector((state: RootState) => state.registration.expectedpay)
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
        if (!currentpay) {
            const errObj = { "total pay": { message: "Please select your current pay." } }
            setErrors(errObj)
        } 
        else if(!expectedpay){
            const errObj = { "expected pay": { message: "Please select your expected pay." } }
            setErrors(errObj) 
        }
        else {
            setErrors({})
            nextFunc()
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-md w-full'>
                <PageHeading text={"Current & Expected Annual Pay"} />
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Current Pay"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Select<ReactSelectOptionType> options={yearOptions} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Lakhs" value={currentpay?.lakhs} onChange={(value) => {
                                const totexp: CurrentAndExpectedPay = {
                                    lakhs: value!,
                                    thousands: currentpay?.thousands ?? null
                                }
                                dispatch(setCurrentPay(totexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={monthOptions} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select Thousands" value={currentpay?.thousands} onChange={(value) => {
                                const totexp: CurrentAndExpectedPay = {
                                    lakhs: currentpay?.thousands ?? null,
                                    thousands: value!
                                }
                                dispatch(setCurrentPay(totexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
                </div>
                <br />
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Expected Pay"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Select<ReactSelectOptionType> options={expectedPayLakh} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Lakhs" value={expectedpay?.lakhs} onChange={(value) => {
                                const relexp: CurrentAndExpectedPay = {
                                    lakhs: value!,
                                    thousands: expectedpay?.thousands ?? null
                                }
                                dispatch(setExpectedPay(relexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={expectedPayThousand} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select Thousands" value={expectedpay?.thousands} onChange={(value) => {
                                const relexp: CurrentAndExpectedPay = {
                                    lakhs: expectedpay?.lakhs ?? null,
                                    thousands: value!
                                }
                                dispatch(setExpectedPay(relexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
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
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default CurrentAndExpectedPay