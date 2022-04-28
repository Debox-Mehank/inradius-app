import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import Map from "../../reusables/Map"
import NextButton from "../NextButton"
import PageHeading from "../PageHeading"
import PrevButton from "../PrevButton"

const LocationRadius = () => {
    const radius = useSelector((state: RootState) => state.registration.radius)
    const [showError, setShowError] = useState(false)
    return (
        <div data-aos="slide-left" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true" className='w-full h-full grid place-items-center'>
            <div className='flex flex-col max-w-2xl w-full h-full justify-center'>
                <PageHeading text="Radius" />
                <Map />
                {showError && radius === null && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{"Please define your radius."}</p>
                )}
                <div className='flex flex-row gap-2 justify-end select-none my-6'>
                    <PrevButton />
                    <NextButton validate={radius ? true : false} setShowError={setShowError} />
                </div>
            </div>
        </div>
    )
}

export default LocationRadius