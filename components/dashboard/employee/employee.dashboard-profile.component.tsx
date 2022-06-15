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
import EmployeeLocationEdit from "../modals/employee/location.modal.component";
import EmployeeRadiusEdit from "../modals/employee/radius.modal.component";

export enum editModalsEnum {
  location = "location",
  radius = "radius",
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
      {/* Modals */}
      <Modal show={editModals !== undefined}>
        <>
          {editModals === editModalsEnum.location && (
            <EmployeeLocationEdit setEditModals={setEditModals} />
          )}
          {editModals === editModalsEnum.radius && (
            <EmployeeRadiusEdit setEditModals={setEditModals} />
          )}
        </>
      </Modal>

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
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
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
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Domain</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.domain?.domain}
          </p>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Sub Domains</p>
          <p className="flex-1 text-xs font-light">
            {(dashboardEmployee?.subDomain ?? [])
              .map((el) => el.subDomain)
              .toString()}
          </p>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Skills</p>
          <p className="flex-1 text-xs font-light">
            {(dashboardEmployee?.skills ?? []).map((el) => el.label).toString()}
          </p>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-sm font-medium">Qualification</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployee?.qualification?.qualification}
          </p>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
        {!dashboardEmployee?.fresher ? (
          <>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Total Experience</p>
              <p className="flex-1 text-xs font-light">
                {dashboardEmployee?.totalExp?.years.value} years{" "}
                {dashboardEmployee?.totalExp?.months.value} months
              </p>
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
            </div>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Relevant Experience</p>
              <p className="flex-1 text-xs font-light">
                {dashboardEmployee?.relevantExp?.years.value} years{" "}
                {dashboardEmployee?.relevantExp?.months.value} months
              </p>
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
            </div>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Current Pay</p>
              <p className="flex-1 text-xs font-light">
                ₹{" "}
                {(dashboardEmployee?.currentPay ?? 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
            </div>
          </>
        ) : (
          <>
            <div className="w-full border-t border-b py-2 flex justify-between items-center">
              <p className="flex-1 text-sm font-medium">Fresher</p>
              <p className="flex-1 text-xs font-light">Yes</p>
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
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
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardProfile;
