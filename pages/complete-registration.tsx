import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CurrentAndExpectedPay from '../components/complete-registration/employee/CurrentExpectedPay'
import IndustryDomain from '../components/complete-registration/employee/IndustryDomain'
import LinkedInResume from '../components/complete-registration/employee/LinkedInResume'
import LocationDropdown from '../components/complete-registration/employee/LocationDropdown'
import LocationRadius from '../components/complete-registration/employee/LocationRadius'
import Qualifications from '../components/complete-registration/employee/Qualifications'
import Skills from '../components/complete-registration/employee/Skills'
import TotalAndRelevant from '../components/complete-registration/employee/TotalAndRelevant'
import WorkExp from '../components/complete-registration/employee/WorkExp'
import Layout from '../components/complete-registration/Layout'
import { setUserLocation, UserLocationType } from '../features/locationSlice'
// import { setRegistrationData } from '../features/registrationSlice'

const CompleteRegistration = () => {
    const router = useRouter()
    const { page } = router.query

    // Registration Data From Redux
    const registration = useSelector((state: RootState) => state.registration)

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
            if (registration.steps[registration.currentStep - 1] !== page) {
                router.replace("/complete-registration?page=" + registration.steps[registration.currentStep - 1])
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
    }, [page, registration.steps])

    return (
        <Layout>
            {page ? <>
                {page === "location" && (
                    <LocationDropdown />
                )}
                {page === "radius" && (
                    <LocationRadius />
                )}
                {page === "industry-domain" && (
                    <IndustryDomain />
                )}
                {page === "qualification" && (
                    <Qualifications />
                )}
                {page === "skills" && (
                    <Skills />
                )}
                {page === "work-experience" && (
                    <WorkExp />
                )}
                {page === "total-relevant-experience" && (
                    <TotalAndRelevant />
                )}
                {page === "current-expected-pay" && (
                    <CurrentAndExpectedPay />
                )}
                {page === "linkedin-resume" && (
                    <LinkedInResume />
                )}
            </> : <p>Loading..</p>}
        </Layout>
    )

}

export default CompleteRegistration