import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import Layout from "../components/profile/common/layout.component";
import EmployeeCurrentExpectedPay from "../components/profile/employee/employee.current-expected-pay";
import EmployeeIndustryDomain from "../components/profile/employee/employee.industry-domain.component";
import EmployeeLocation from "../components/profile/employee/employee.location.component";
import EmployeeQualification from "../components/profile/employee/employee.qualification.component";
import EmployeeRadius from "../components/profile/employee/employee.radius.component";
import EmployeeSubDomainSkill from "../components/profile/employee/employee.subdomain-skill.component";
import EmployeeTotalRelevantExp from "../components/profile/employee/employee.total-relevant-exp.component";
import EmployeeWorkExp from "../components/profile/employee/employee.workexp.component";
import {
  addAllDomains,
  addAllIndustries,
  addAllLocations,
  addAllQualifications,
  addAllSkills,
  addAllSubdomains,
  toggleLoading,
} from "../features/common.slice";
import {
  EmployeeData,
  EMPLOYEE_STEPS_ENUM,
  setEmployeeData,
  updateEmployeeData,
  //   updateEmployeeData,
} from "../features/employee.slice";
import {
  useAllDomainsLazyQuery,
  useAllIndustriesLazyQuery,
  useAllLocationsLazyQuery,
  useAllQualificationsLazyQuery,
  useAllSkillsLazyQuery,
  useAllSubDomainsLazyQuery,
  useGetEmployeeLazyQuery,
} from "../generated/graphql";
import EmployeeLinkedInResume from "../components/profile/employee/employee.linkedin-resume.component";
import EmployeePersonalKyc from "../components/profile/employee/employee.personal-kyc.component";
import AuthChecker from "../components/reusables/AuthChecker";

const EmployeeProfile = () => {
  const router = useRouter();
  const { page } = router.query;

  const dispatch = useDispatch();

  const [getEmployeeQuery] = useGetEmployeeLazyQuery();
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
        // toast.error(allLocationsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
        // toast.error(allIndustriesError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
        // toast.error(allDomainsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
        // toast.error(allSubdomainsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
        // toast.error(allSkillsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
        // toast.error(allQualificationsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
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
      dispatch(toggleLoading());
      const { data: employeeData, error: employeeError } =
        await getEmployeeQuery();
      if (employeeError !== undefined) {
        // toast.error(employeeError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
        return null;
      }

      if (employeeData === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      //   Store the data in slice
      const empData: EmployeeData = {
        aadharCard: employeeData.getEmployee.aadharCard,
        currentAddress: employeeData.getEmployee.currentAddress,
        currentPay: employeeData.getEmployee.currentPay,
        dob: employeeData.getEmployee.dob,
        domain: employeeData.getEmployee.domain,
        expectedPay: employeeData.getEmployee.expectedPay,
        fresher: employeeData.getEmployee.fresher,
        gender: employeeData.getEmployee.gender,
        industry: employeeData.getEmployee.industry,
        interests: [],
        latitude: employeeData.getEmployee.latitude,
        linkedIn: employeeData.getEmployee.linkedIn,
        location: employeeData.getEmployee.location,
        longitude: employeeData.getEmployee.longitude,
        panCard: employeeData.getEmployee.panCard,
        qualification: employeeData.getEmployee.qualification,
        radius: employeeData.getEmployee.radius,
        relevantExp: employeeData.getEmployee.relevantExp
          ? {
              years: {
                label: employeeData.getEmployee.relevantExp?.years ?? "",
                value: employeeData.getEmployee.relevantExp?.years ?? "",
              },
              months: {
                label: employeeData.getEmployee.relevantExp?.months ?? "",
                value: employeeData.getEmployee.relevantExp?.months ?? "",
              },
            }
          : null,
        resume: employeeData.getEmployee.resume,
        skills: employeeData.getEmployee.skills.map((s) => ({
          label: s.skill,
          value: s._id,
        })),
        subDomain: employeeData.getEmployee.subDomain,
        totalExp: employeeData.getEmployee.totalExp
          ? {
              years: {
                label: employeeData.getEmployee.totalExp?.years ?? "",
                value: employeeData.getEmployee.totalExp?.years ?? "",
              },
              months: {
                label: employeeData.getEmployee.totalExp?.months ?? "",
                value: employeeData.getEmployee.totalExp?.months ?? "",
              },
            }
          : null,
        workExp:
          employeeData.getEmployee.workExp.length > 0
            ? employeeData.getEmployee.workExp.map((w) => ({
                company: w.company,
                current: w.current,
                desc: w.desc,
                designation: w.designation,
                end: w.end ? moment(w.end).format("YYYY-MM-DD") : null,
                start: moment(w.start).format("YYYY-MM-DD"),
              }))
            : [
                {
                  company: null,
                  current: null,
                  desc: null,
                  designation: null,
                  end: null,
                  start: null,
                },
              ],
      };
      dispatch(setEmployeeData(empData));
      dispatch(toggleLoading());

      // Fetching User's Location
      const geo = navigator.geolocation;
      if (!geo) {
        toast.info("Geolocation is not supported!");
        return;
      }
      const onChange = ({ coords }: GeolocationPosition) => {
        if (empData.latitude === null || empData.latitude === undefined) {
          // Save in Redux
          dispatch(
            updateEmployeeData({
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

      // This is used to redirect user to start of the employee form
      router.replace("/employee-profile?page=" + EMPLOYEE_STEPS_ENUM.location);
    };
    myFunc();
    // eslint-disable-next-line
  }, [getEmployeeQuery, dispatch]);

  return (
    <AuthChecker page="profile">
      <Layout>
        {page && page === EMPLOYEE_STEPS_ENUM.location && <EmployeeLocation />}
        {page && page === EMPLOYEE_STEPS_ENUM.radius && <EmployeeRadius />}
        {page && page === EMPLOYEE_STEPS_ENUM["industry-domain"] && (
          <EmployeeIndustryDomain />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["subdomain-skills"] && (
          <EmployeeSubDomainSkill />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["qualification"] && (
          <EmployeeQualification />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["work-experience"] && (
          <EmployeeWorkExp />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["total-relevant-experience"] && (
          <EmployeeTotalRelevantExp />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["current-expected-pay"] && (
          <EmployeeCurrentExpectedPay />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["linkedin-resume"] && (
          <EmployeeLinkedInResume />
        )}
        {page && page === EMPLOYEE_STEPS_ENUM["personal-kyc"] && (
          <EmployeePersonalKyc />
        )}
      </Layout>
    </AuthChecker>
  );
};

export default EmployeeProfile;
