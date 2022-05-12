import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import CompanyMap from "../../reusables/CompanyMap"
import Map from "../../reusables/Map"
import NextButton from "../NextButton"
import NextCompanyButton from "../NextCompanyButton"
import PageHeading from "../PageHeading"
import PrevButton from "../PrevButton"
import PrevCompanyButton from "../PrevCompanyButton"

const JobLocationRadius = () => {
    const radius = useSelector((state: RootState) => state.companyRegistration.radius)
    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-2xl w-full h-full justify-center'>
                <PageHeading text="Radius" />
                <CompanyMap />
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevCompanyButton />
                    <NextCompanyButton />
                </div>
            </div>
        </div>
    )
}

export default JobLocationRadius