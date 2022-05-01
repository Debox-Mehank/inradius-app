import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CompanyVerification from '../components/complete-registration/employer/CompanyVerification'
import LayoutCompany from '../components/complete-registration/LayoutCompany'
import { setUserLocation, UserLocationType } from '../features/locationSlice'

const CompleteRegistration = () => {
    const router = useRouter()
    const { page } = router.query

    // Company Registration Data From Redux
    const companyRegistration = useSelector((state: RootState) => state.companyRegistration)

    const dispatch = useDispatch()

    const onSuccess = (location: GeolocationPosition) => {
        const data: UserLocationType = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        dispatch(setUserLocation(data))
    };

    const onError = (error: GeolocationPositionError) => {
        console.log(error.message);
    };

    // Get Location
    useEffect(() => {
        if (page) {
            if (companyRegistration.steps[companyRegistration.currentStep - 1] !== page) {
                router.replace("/complete-registration?page=" + companyRegistration.steps[companyRegistration.currentStep - 1])
            }
            if (!("geolocation" in navigator)) {
                // onError({
                //     code: 0,
                //     message: "Geolocation not supported",
                // });
                console.log("Geo Location Not Supported");
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, [page, companyRegistration.steps])

    return (
        <LayoutCompany>
            {page ? (
                <>
                    {companyRegistration.status !== "verification pending" && companyRegistration.status !== "verification in-progress" ? (
                        <>
                            First Job Listing
                            {/* {page === "upload-documents" && (
                                <CompanyVerification />
                            )} */}
                        </>
                    ) : (
                        <>
                            {page === "upload-documents" && (
                                <CompanyVerification />
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </LayoutCompany>
    )

}

export default CompleteRegistration