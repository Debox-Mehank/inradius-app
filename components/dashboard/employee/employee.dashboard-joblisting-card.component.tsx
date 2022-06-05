import {
  faBookmark,
  faBriefcase,
  faClipboard,
  faIndianRupeeSign,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DashboardEmployerCardData } from "../../../features/dashboard.sice";
import ReusableButton from "../../reusables/ReusableButton";

const EmployeeDashboardJobLisitingCard = ({
  companyName,
  companyImage,
  jobTitle,
  jobDesc,
  jobType,
  minPay,
  maxPay,
  skills,
  location,
  domain,
  subDomain,
  minRequiredExp,
}: DashboardEmployerCardData) => {
  return (
    <div className="w-full max-w-3xl border border-gray-300 p-8 rounded-3xl bg-white flex gap-8 items-center">
      <div className="bg-white px-8 py-8 rounded-3xl border border-gray-300">
        <img
          src={companyImage ?? ""}
          alt={companyName ?? ""}
          className="object-contain w-36 h-36"
        />
      </div>
      <div className="flex-1 w-full h-full flex flex-col justify-start">
        <p className="text-xl font-semibold">{jobTitle}</p>
        <p className="text-sm font-normal">{domain}</p>
        {/* <p className="text-xs font-normal mt-2">{skills.toString()}</p>
        <p className="text-xs font-normal mb-4 mt-2">{subDomain.toString()}</p> */}
        <p className="text-xs font-normal mt-2">
          <FontAwesomeIcon
            icon={faClipboard}
            size={"lg"}
            className="text-primary mr-2"
          />
          {jobDesc}
        </p>
        <div className="flex justify-start items-center gap-4">
          {minRequiredExp && (
            <p className="text-xs font-normal mt-3">
              <FontAwesomeIcon
                icon={faBriefcase}
                size={"lg"}
                className="text-primary mr-2"
              />
              {minRequiredExp.years} year {minRequiredExp.months} months
            </p>
          )}
          <p className="text-xs font-normal mt-3">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              size={"lg"}
              className="text-primary mr-2"
            />
            {(minPay ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} -{" "}
            {(maxPay ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div className="flex justify-start items-center gap-4 mt-6">
          <ReusableButton
            bg="bg-primary w-full"
            text="text-white"
            title="Interested"
            size="small"
            onClick={() => {
              console.log("Interested!");
            }}
          />
          <ReusableButton
            bg="bg-white w-full border border-black"
            text="text-black"
            title="Not Interested"
            size="small"
            onClick={() => {
              console.log("Not Interested!");
            }}
          />
          <ReusableButton
            bg="bg-black"
            text="text-white"
            title=""
            size="small"
            icon={faBookmark}
            iconButton={true}
            onClick={() => {
              console.log("Not Interested!");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardJobLisitingCard;
