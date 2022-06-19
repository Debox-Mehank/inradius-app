import { faChevronDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import {
  addAllDomains,
  addAllIndustries,
  addAllLocations,
  addAllQualifications,
  addAllSkills,
  addAllSubdomains,
  toggleLoading,
} from "../../../features/common.slice";
import {
  useAllDomainsLazyQuery,
  useAllIndustriesLazyQuery,
  useAllLocationsLazyQuery,
  useAllQualificationsLazyQuery,
  useAllSkillsLazyQuery,
  useAllSubDomainsLazyQuery,
} from "../../../generated/graphql";
import Modal from "../../reusables/Modal.component";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployeeCurrentPayEdit from "../modals/employee/currentpay.modal.component";
import EmployeeDomainEdit from "../modals/employee/domain.modal.component";
import EmployeeExpectedPayEdit from "../modals/employee/expectedpay.modal.component";
import EmployeeIndustryEdit from "../modals/employee/industry.modal.component";
import EmployeeLocationEdit from "../modals/employee/location.modal.component";
import EmployeeProfileEdit from "../modals/employee/profile.modal.component";
import EmployeeQualificationEdit from "../modals/employee/qualification.modal.component";
import EmployeeRadiusEdit from "../modals/employee/radius.modal.component";
import EmployeeRelevantExpEdit from "../modals/employee/relevantexp.modal.component";
import EmployeeSkillEdit from "../modals/employee/skills.modal.component";
import EmployeeSubDomainEdit from "../modals/employee/subdomains.modal.component";
import EmployeeTotalExpEdit from "../modals/employee/totalexp.modal.component";

export enum editModalsEnum {
  image = "image",
  location = "location",
  radius = "radius",
  industry = "industry",
  domain = "domain",
  subdomains = "subdomains",
  skills = "skills",
  qualification = "qualification",
  totalexp = "totalexp",
  relevantexp = "relevantexp",
  currentpay = "currentpay",
  expectedpay = "expectedpay",
}

const EmployeeDashboardProfile = () => {
  const [allLocationsQuery] = useAllLocationsLazyQuery();
  const [allIndustriesQuery] = useAllIndustriesLazyQuery();
  const [allDomainsQuery] = useAllDomainsLazyQuery();
  const [allSubdomainsQuery] = useAllSubDomainsLazyQuery();
  const [allSkillsQuery] = useAllSkillsLazyQuery();
  const [allQualificationsQuery] = useAllQualificationsLazyQuery();

  const dispatch = useDispatch();

  const dashboardEmployee = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee
  );
  const dashboardUser = useSelector(
    (state: RootState) => state.dashboard.dashboardUser
  );

  const [editModals, setEditModals] = useState<editModalsEnum>();

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

  return (
    <div className="flex flex-col px-8 relative">
      <>
        {editModals === editModalsEnum.image && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeProfileEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.location && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeLocationEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.radius && (
          <Modal show={editModals !== undefined} size={"w-4/5"}>
            <EmployeeRadiusEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.industry && (
          <Modal show={editModals !== undefined} size={"w-4/5"}>
            <EmployeeIndustryEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.domain && (
          <Modal show={editModals !== undefined} size={"w-4/5"}>
            <EmployeeDomainEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.subdomains && (
          <Modal show={editModals !== undefined} size={"w-3/5"}>
            <EmployeeSubDomainEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.skills && (
          <Modal show={editModals !== undefined} size={"w-3/5"}>
            <EmployeeSkillEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.qualification && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeQualificationEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.totalexp && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeTotalExpEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.relevantexp && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeRelevantExpEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.currentpay && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeCurrentPayEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {editModals === editModalsEnum.expectedpay && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployeeExpectedPayEdit setEditModals={setEditModals} />
          </Modal>
        )}
      </>

      <DashboardPageHeading title="My Profile" />
      <div className="overflow-y-auto dashboard-scroll pr-3">
        <h4 className="font-semibold text-base text-black mb-3">
          General Information
        </h4>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Full Name</p>
          <p className="flex-1 text-xs font-light">
            {dashboardUser?.firstName} {dashboardUser?.lastName}
          </p>
          {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Email Id</p>
          <p className="flex-1 text-xs font-light">{dashboardUser?.email}</p>
          {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Date Of Birth</p>
          <p className="flex-1 text-xs font-light">
            {moment(dashboardEmployee?.dob).format("DD-MM-yyyy")}
          </p>
          {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Gender</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.gender}
          </p>
          {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Current Address</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.currentAddress}
          </p>
          {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Profile Image</p>
          <div className="flex-1 w-12 h-12">
            <Image
              src={dashboardUser?.image ?? ""}
              width={50}
              height={50}
              objectFit={"cover"}
              alt={"profile image"}
            />
          </div>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.image)}
          />
        </div>
        <h4 className="font-semibold text-base text-black mt-3 mb-3">
          Job Preferences
        </h4>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Location</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.location?.location}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.location)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Radius</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.radius} km
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.radius)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Industry</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.industry?.industry}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.industry)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Domain</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.domain?.domain}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.domain)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Sub Domains</p>
          <p className="flex-1 text-xs font-light">
            {(dashboardEmployee?.subDomain ?? [])
              .map((el) => el.subDomain)
              .toString()}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.subdomains)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Skills</p>
          <p className="flex-1 text-xs font-light">
            {(dashboardEmployee?.skills ?? []).map((el) => el.label).toString()}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.skills)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Qualification</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.qualification?.qualification}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.qualification)}
          />
        </div>
        {!dashboardEmployee?.fresher ? (
          <>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Total Experience</p>
              <p className="flex-1 text-xs font-light">
                {dashboardEmployee?.totalExp?.years.value} years{" "}
                {dashboardEmployee?.totalExp?.months.value} months
              </p>
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer"
                onClick={() => setEditModals(editModalsEnum.totalexp)}
              />
            </div>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Relevant Experience</p>
              <p className="flex-1 text-xs font-light">
                {dashboardEmployee?.relevantExp?.years.value} years{" "}
                {dashboardEmployee?.relevantExp?.months.value} months
              </p>
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer"
                onClick={() => setEditModals(editModalsEnum.relevantexp)}
              />
            </div>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Current Pay</p>
              <p className="flex-1 text-xs font-light">
                ₹{" "}
                {(dashboardEmployee?.currentPay ?? 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer"
                onClick={() => setEditModals(editModalsEnum.currentpay)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Fresher</p>
              <p className="flex-1 text-xs font-light">Yes</p>
              {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
            </div>
          </>
        )}
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Expected Pay</p>
          <p className="flex-1 text-xs font-light">
            ₹{" "}
            {(dashboardEmployee?.expectedPay ?? 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editModalsEnum.expectedpay)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardProfile;
