import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { addAllBenefits, toggleLoading } from "../../../features/common.slice";
import { useAllBenefitsLazyQuery } from "../../../generated/graphql";
import Modal from "../../reusables/Modal.component";
import DashboardPageHeading from "../common/dashboard.heading.component";
import EmployerCompanyImageEdit from "../modals/employer/companyimage.modal.component";

export enum editEmployerModalsEnum {
  companyLogo = "companyLogo",
  benefits = "benefits",
  linkedIn = "linkedIn",
  noOfEmployees = "noOfEmployees",
  noOfLocations = "noOfLocations",
  noOfHiring = "noOfHiring",
  landline = "landline",
  lastTurnover = "lastTurnover",
  attritionRate = "attritionRate",
}

const EmployerDashboardProfile = () => {
  const [allBenefitsQuery] = useAllBenefitsLazyQuery();

  const dispatch = useDispatch();

  const [editModals, setEditModals] = useState<editEmployerModalsEnum>();

  const dashboardEmployer = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer
  );

  // Fetch Masters
  useEffect(() => {
    const myFunc = async () => {
      dispatch(toggleLoading());

      // Fetch All Benefits
      const { data: allBenefits, error: allBenefitsError } =
        await allBenefitsQuery();

      if (allBenefitsError !== undefined) {
        // toast.error(allBenefitsError.message, {
        //   autoClose: 2000,
        //   hideProgressBar: true,
        // });
        // dispatch(toggleLoading());
        return null;
      }

      if (allBenefits === undefined) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        dispatch(toggleLoading());
        return null;
      }

      const allBene = allBenefits.allBenefits.map((bene) => ({
        _id: bene._id,
        benefit: bene.benefit,
      }));
      dispatch(addAllBenefits(allBene));

      dispatch(toggleLoading());
    };
    myFunc();
  }, [allBenefitsQuery, dispatch]);

  return (
    <div className="flex flex-col px-8 relative">
      <>
        {editModals === editEmployerModalsEnum.companyLogo && (
          <Modal show={editModals !== undefined} size={"w-2/5"}>
            <EmployerCompanyImageEdit setEditModals={setEditModals} />
          </Modal>
        )}
        {/* {editModals === editModalsEnum.location && (
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
        )} */}
      </>

      <DashboardPageHeading title="My Profile" />
      <div className="overflow-y-auto dashboard-scroll pr-3">
        <h4 className="font-semibold text-base text-black mb-3">
          General Information
        </h4>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company Name</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.companyName}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company Image</p>
          <div className="flex-1 w-12 h-12 flex items-center">
            {dashboardEmployer?.companyImage && (
              <Image
                src={dashboardEmployer.companyImage}
                width={30}
                height={30}
                objectFit={"contain"}
                alt={"company image"}
              />
            )}
          </div>
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer"
            onClick={() => setEditModals(editEmployerModalsEnum.companyLogo)}
          />
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company Pan Number</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.panNo}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company GST Number</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.gstNo}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company LinkedIn</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.linkedIn}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Company Landline</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.landline ?? "N/A"}
          </p>
        </div>
        <h4 className="font-semibold text-base text-black mt-3 mb-3">
          Company Information
        </h4>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Current Address</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.currentAddress ?? "N/A"}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Registered Address</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.registeredAddress ?? "N/A"}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Total Employees</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.noOfEmployees ?? 0}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Hiring for current year</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.noOfHiring ?? "N/A"}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Total Locations</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.noOfLocations ?? 1}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">{"Last year's turnover"}</p>
          <p className="flex-1 text-xs font-light">
            ₹{" "}
            {(dashboardEmployer?.lastTurnover ?? 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div className="w-full border-t border-b py-2 flex justify-between items-center">
          <p className="flex-1 text-xs font-medium">Attrition Rate</p>
          <p className="flex-1 text-xs font-light">
            {dashboardEmployer?.attritionRate ?? "N/A"}
          </p>
        </div>
        {/* <div className="w-full border-t border-b py-2 flex justify-between items-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default EmployerDashboardProfile;
