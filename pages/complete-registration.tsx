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
import JobDesc from '../components/complete-registration/employer/JobDesc'
import Layout from '../components/complete-registration/Layout'
import { setUserLocation, UserLocationType } from '../features/locationSlice'
import { setUser, UserType } from '../features/userSlice'
import { api } from '../utils/AxiosClient'
// import { setRegistrationData } from '../features/registrationSlice'

const CompleteRegistration = () => {
    const router = useRouter()
    const { page } = router.query

    // Registration Data From Redux
    const registration = useSelector((state: RootState) => state.registration)
    const user = useSelector((state: RootState) => state.user)
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
            // if (registration.steps[registration.currentStep - 1] !== page) {
            //     router.replace("/complete-registration?page=" + registration.steps[registration.currentStep - 1])
            // }
            if (!("geolocation" in navigator)) {
                // onError({
                //     code: 0,
                //     message: "Geolocation not supported",
                // });
                console.log("Geo Location Not Supported");
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);

            const fetchFunc = async () => {
                const userDetails = await api.post("user", { id: localStorage.getItem("id") })
                if (userDetails.data.user !== null) {
                    const resUser = userDetails.data.user
                    dispatch(setUser({ companyName: resUser.companyName, email: resUser.email, firstName: resUser.firstName, lastName: resUser.lastName, password: resUser.password, phoneNumber: null, type: resUser.type }))
                }
            }
            fetchFunc()
        }
    }, [page, registration.steps])

    return (
        <Layout>
            {user.type === UserType.employee && page ? <>
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
            </> : null}
            {user.type === UserType.employer && page ? <>
                {page === "job-desc" && (
                    <JobDesc />
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
            </> : null}
        </Layout>
    )

}

export default CompleteRegistration