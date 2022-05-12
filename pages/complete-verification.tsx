import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CurrentAndExpectedPay from '../components/complete-registration/employee/CurrentExpectedPay'
import IndustryDomain from '../components/complete-registration/employee/IndustryDomain'
import LinkedInResume from '../components/complete-registration/employee/LinkedInResume'
import LocationRadius from '../components/complete-registration/employee/LocationRadius'
import Qualifications from '../components/complete-registration/employee/Qualifications'
import Skills from '../components/complete-registration/employee/Skills'
import TotalAndRelevant from '../components/complete-registration/employee/TotalAndRelevant'
import WorkExp from '../components/complete-registration/employee/WorkExp'
import CompanyVerification from '../components/complete-registration/employer/CompanyVerification'
import FirstJobPosting from '../components/complete-registration/employer/FirstJobPosting'
import JobDesc from '../components/complete-registration/employer/JobDesc'
import JobIndustryDomain from '../components/complete-registration/employer/JobIndustryDomain'
import JobLocationDropdown from '../components/complete-registration/employer/JobLocationDropdown'
import JobLocationRadius from '../components/complete-registration/employer/JobLocationRadius'
import JobPay from '../components/complete-registration/employer/JobPay'
import JobQualifications from '../components/complete-registration/employer/JobQualifications'
import JobSkills from '../components/complete-registration/employer/JobSkills'
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
            // if (companyRegistration.steps[companyRegistration.currentStep - 1] !== page) {
            //     router.replace("/complete-registration?page=" + companyRegistration.steps[companyRegistration.currentStep - 1])
            // }
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
            {page ? <>
                {page === "upload-documents" && (
                    <FirstJobPosting />
                )}
                {page === "job-desc" && (
                    <JobDesc />
                )}
                {page === "location-dropdown" && (
                    <JobLocationDropdown />
                )}
                {page === "radius" && (
                    <JobLocationRadius />
                )}
                {page === "industry-domain" && (
                    <JobIndustryDomain />
                )}
                {page === "qualification" && (
                    <JobQualifications />
                )}
                {page === "skills" && (
                    <JobSkills />
                )}
                {page === "pay" && (
                    <JobPay />
                )}
            </> : null}
        </LayoutCompany>
    )

}

export default CompleteRegistration