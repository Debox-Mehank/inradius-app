import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/jobs/common/layout.component";
import {
  toggleLoading,
  addAllLocations,
  addAllIndustries,
  addAllDomains,
  addAllSubdomains,
  addAllSkills,
  addAllQualifications,
} from "../features/common.slice";
import {
  useGetJobDetailsLazyQuery,
  useAllDomainsLazyQuery,
  useAllIndustriesLazyQuery,
  useAllLocationsLazyQuery,
  useAllQualificationsLazyQuery,
  useAllSkillsLazyQuery,
  useAllSubDomainsLazyQuery,
} from "../generated/graphql";
import {
  EmployerJobState,
  JOB_STEPS_ENUM,
  setJobData,
  updateJobData,
} from "../features/job.slice";
import JobDetailsJobType from "../components/jobs/jobs.job-type.component";
import JobDetailsLocation from "../components/jobs/jobs.job-location.component";
import JobDetailsRadius from "../components/jobs/jobs.job-radius.component";
import JobDetailsIndustryDomain from "../components/jobs/jobs.job-industry-domain.component";
import JobDetailsSubdomainSkill from "../components/jobs/jobs.job-subdomain-skill.component";
import JobDetailsMinReqExp from "../components/jobs/jobs.job-min-req-exp.component";
import JobDetailsMinMaxPay from "../components/jobs/jobs.job-min-max-pay.component";
import JobDetailsQualification from "../components/jobs/jobs.job-qualification.component";
import AuthChecker from "../components/reusables/AuthChecker";

const JobDetails = () => {
  const router = useRouter();
  const { jobId, page } = router.query;

  const dispatch = useDispatch();

  const [getJobDetailsQuery] = useGetJobDetailsLazyQuery();

  const [allLocationsQuery] = useAllLocationsLazyQuery();
  const [allIndustriesQuery] = useAllIndustriesLazyQuery();
  const [allDomainsQuery] = useAllDomainsLazyQuery();
  const [allSubdomainsQuery] = useAllSubDomainsLazyQuery();
  const [allSkillsQuery] = useAllSkillsLazyQuery();
  const [allQualificationsQuery] = useAllQualificationsLazyQuery();

  // Fetch Masters
  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());

      // Fetch All Location
      const { data: allLocationsData, error: allLocationsError } =
        await allLocationsQuery();

      if (allLocationsError !== undefined) {
        toast.error(allLocationsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allLocationsData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allLoc = allLocationsData.allLocations.map((loc) => ({
        _id: loc._id,
        location: loc.location,
      }));
      dispatch(addAllLocations(allLoc));

      // Fetch All Industries
      const { data: allIndustriesData, error: allIndustriesError } =
        await allIndustriesQuery();

      if (allIndustriesError !== undefined) {
        toast.error(allIndustriesError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allIndustriesData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allInd = allIndustriesData.allIndustries.map((ind) => ({
        _id: ind._id,
        industry: ind.industry,
      }));
      dispatch(addAllIndustries(allInd));

      // Fetch All Domains
      const { data: allDomainsData, error: allDomainsError } =
        await allDomainsQuery();

      if (allDomainsError !== undefined) {
        toast.error(allDomainsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allDomainsData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allDomains = allDomainsData.allDomains.map((dom) => ({
        _id: dom._id,
        domain: dom.domain,
      }));
      dispatch(addAllDomains(allDomains));

      // Fetch All Subdomains
      const { data: allSubdomainsData, error: allSubdomainsError } =
        await allSubdomainsQuery();

      if (allSubdomainsError !== undefined) {
        toast.error(allSubdomainsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allSubdomainsData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allSubdomains = allSubdomainsData.allSubDomains.map((sd) => ({
        _id: sd._id,
        subDomain: sd.subDomain,
        domain: {
          _id: sd.domain._id,
          domain: sd.domain.domain,
        },
      }));
      dispatch(addAllSubdomains(allSubdomains));

      // Fetch All Skills
      const { data: allSkillsData, error: allSkillsError } =
        await allSkillsQuery();

      if (allSkillsError !== undefined) {
        toast.error(allSkillsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allSkillsData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allSkills = allSkillsData.allSkills.map((s) => ({
        _id: s._id,
        skill: s.skill,
      }));
      dispatch(addAllSkills(allSkills));

      // Fetch All Qualifications
      const { data: allQualificationsData, error: allQualificationsError } =
        await allQualificationsQuery();

      if (allQualificationsError !== undefined) {
        toast.error(allQualificationsError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      if (allQualificationsData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allQual = allQualificationsData.allQualifications.map((qual) => ({
        _id: qual._id,
        qualification: qual.qualification,
      }));
      dispatch(addAllQualifications(allQual));

      dispatch(toggleLoading());
    };
    myFunc();
  }, [
    allDomainsQuery,
    allIndustriesQuery,
    allLocationsQuery,
    allQualificationsQuery,
    allSubdomainsQuery,
    allSkillsQuery,
    dispatch,
  ]);

  // Fetch Stored Data on every refresh
  useEffect(() => {
    const myFunc = async () => {
      if (jobId) {
        dispatch(toggleLoading());
        const { data: jobDetailsData, error: jobDetailsError } =
          await getJobDetailsQuery({
            variables: { jobId: jobId.toString() },
          });
        if (jobDetailsError !== undefined) {
          toast.error(jobDetailsError.message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        if (jobDetailsData === undefined) {
          toast.error("Something went wrong!", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        const job = jobDetailsData.getJobDetails;

        console.log(job);

        //   Store the data in slice
        const jobData: EmployerJobState = {
          _id: job._id,
          jobTitle: job.jobTitle,
          jobDesc: job.jobDesc,
          jobStatus: job.jobStatus,
          jobType: job.jobType
            ? { label: job.jobType, value: job.jobType }
            : null,
          listingComplete: job.listingComplete,
          location: job.location,
          radius: job.radius,
          latitude: job.latitude,
          longitude: job.longitude,
          qualification: job.qualification,
          industry: job.industry,
          domain: job.domain,
          subDomain: job.subDomain,
          skills: job.skills.map((s) => ({
            label: s.skill,
            value: s._id,
          })),
          minRequiredExp: job.minRequiredExp
            ? {
                years: {
                  label: job.minRequiredExp?.years ?? "",
                  value: job.minRequiredExp?.years ?? "",
                },
                months: {
                  label: job.minRequiredExp?.months ?? "",
                  value: job.minRequiredExp?.months ?? "",
                },
              }
            : null,
          minPay: job.minPay,
          maxPay: job.maxPay,
        };

        dispatch(setJobData(jobData));
        dispatch(toggleLoading());

        // Fetching User's Location
        const geo = navigator.geolocation;
        if (!geo) {
          toast.info("Geolocation is not supported!");
          return;
        }
        const onChange = ({ coords }: GeolocationPosition) => {
          if (job.latitude === null || job.latitude === undefined) {
            // Save in Redux
            dispatch(
              updateJobData({
                latitude: coords.latitude,
                longitude: coords.longitude,
              })
            );
          }
        };

        const onError = ({ message }: GeolocationPositionError) => {
          toast.info(message);
          // Implement Non Dismissable Modal Until Location is Working
          return;
        };

        const watcher = geo.watchPosition(onChange, onError);
        router.replace(
          "/job-details?page=" + JOB_STEPS_ENUM["job-type"] + "&jobId=" + jobId
        );
      }
    };
    myFunc();
    // eslint-disable-next-line
  }, [getJobDetailsQuery, dispatch, jobId]);

  return (
    <AuthChecker>
      <Layout>
        {page && page === JOB_STEPS_ENUM["job-type"] && <JobDetailsJobType />}
        {page && page === JOB_STEPS_ENUM["location"] && <JobDetailsLocation />}
        {page && page === JOB_STEPS_ENUM["radius"] && <JobDetailsRadius />}
        {page && page === JOB_STEPS_ENUM["industry-domain"] && (
          <JobDetailsIndustryDomain />
        )}
        {page && page === JOB_STEPS_ENUM["subdomain-skills"] && (
          <JobDetailsSubdomainSkill />
        )}
        {page && page === JOB_STEPS_ENUM["qualification"] && (
          <JobDetailsQualification />
        )}
        {page && page === JOB_STEPS_ENUM["min-required-experience"] && (
          <JobDetailsMinReqExp />
        )}
        {page && page === JOB_STEPS_ENUM["min-max-pay"] && (
          <JobDetailsMinMaxPay />
        )}
      </Layout>
    </AuthChecker>
  );
};

export default JobDetails;
