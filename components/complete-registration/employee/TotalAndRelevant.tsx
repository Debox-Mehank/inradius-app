import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { RootState } from "../../../app/store"
import { setRelevantExp, setTotalExp } from "../../../features/registrationSlice"
import { reactSelectColorStyles } from "../../../utils/common"
import { ExpInYearsAndMonthsType, ReactSelectOptionType } from "../../../utils/custom_types"
import NextButton from '../NextButton'
import PageHeading from "../PageHeading"
import PrevButton from '../PrevButton'

const TotalAndRelevant = () => {
    const totalexp = useSelector((state: RootState) => state.registration.totalexp)
    const relevantexp = useSelector((state: RootState) => state.registration.relevantexp)
    const dispatch = useDispatch();

    const yearOptions: ReactSelectOptionType[] = [
        { label: "0 Year", value: "0" },
        { label: "1 Year", value: "1" },
        { label: "2 Years", value: "2" },
        { label: "3 Years", value: "3" },
        { label: "4 Years", value: "4" },
        { label: "5 Years", value: "5" },
        { label: "6 Years", value: "6" },
        { label: "7 Years", value: "7" },
        { label: "8 Years", value: "8" },
        { label: "9 Years", value: "9" },
        { label: "10 Years", value: "10" },
        { label: "11 Years", value: "11" },
        { label: "12 Years", value: "12" },
    ]

    const monthOptions: ReactSelectOptionType[] = [
        { label: "0 Month", value: "0" },
        { label: "1 Month", value: "1" },
        { label: "2 Months", value: "2" },
        { label: "3 Months", value: "3" },
        { label: "4 Months", value: "4" },
        { label: "5 Months", value: "5" },
        { label: "6 Months", value: "6" },
        { label: "7 Months", value: "7" },
        { label: "8 Months", value: "8" },
        { label: "9 Months", value: "9" },
        { label: "10 Months", value: "10" },
        { label: "11 Months", value: "11" },
        { label: "12 Months", value: "12" },
    ]

    const [errors, setErrors] = useState<any>({})

    const onSubmit = (nextFunc: () => void) => {
        if (!totalexp) {
            const errObj = { "total experience": { message: "Please select your total experience." } }
            setErrors(errObj)
        } 
        else if(!relevantexp){
            const errObj = { "relevant experience": { message: "Please select your relevant experience." } }
            setErrors(errObj) 
        }
        else {
            const totalExp = parseFloat(`${totalexp.years?.value}.${totalexp.months?.value}`)
            const relevantExp = parseFloat(`${relevantexp.years?.value}.${relevantexp.months?.value}`)
            if(relevantExp > totalExp){
            const errObj = { "exp error": { message: "Please make your relevant experience less than your total experience." } }
            setErrors(errObj) 
            }
            else{
            setErrors({})
            nextFunc()
            }
        }
    }

    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-md w-full'>
                <PageHeading text={"Total & Relevant Experience"} />
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Total Experience"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Select<ReactSelectOptionType> options={yearOptions} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Years" value={totalexp?.years} onChange={(value) => {
                                const totexp: ExpInYearsAndMonthsType = {
                                    years: value!,
                                    months: totalexp?.months ?? null
                                }
                                dispatch(setTotalExp(totexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={monthOptions} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select No. of Months" value={totalexp?.months} onChange={(value) => {
                                const totexp: ExpInYearsAndMonthsType = {
                                    years: totalexp?.years ?? null,
                                    months: value!
                                }
                                dispatch(setTotalExp(totexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
                </div>
                <br />
                <div className="flex flex-col w-full">
                    <p className={`text-md w-full text-left font-semibold my-2`}>{"Relevant Experience"}</p>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Select<ReactSelectOptionType> options={yearOptions} getOptionLabel={(years: ReactSelectOptionType) => years.label}
                            getOptionValue={(years: ReactSelectOptionType) => years.value} className="w-full" placeholder="Select No. of Years" value={relevantexp?.years} onChange={(value) => {
                                const relexp: ExpInYearsAndMonthsType = {
                                    years: value!,
                                    months: relevantexp?.months ?? null
                                }
                                dispatch(setRelevantExp(relexp))
                            }} styles={reactSelectColorStyles} />
                        <Select<ReactSelectOptionType> options={monthOptions} getOptionLabel={(months: ReactSelectOptionType) => months.label}
                            getOptionValue={(months: ReactSelectOptionType) => months.value} className="w-full" placeholder="Select No. of Months" value={relevantexp?.months} onChange={(value) => {
                                const relexp: ExpInYearsAndMonthsType = {
                                    years: relevantexp?.years ?? null,
                                    months: value!
                                }
                                dispatch(setRelevantExp(relexp))
                            }} styles={reactSelectColorStyles} />
                    </div>
                </div>
                {errors['total experience'] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors['total experience']['message']}</p>
                )}
                {errors['relevant experience'] && (
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

export default TotalAndRelevant