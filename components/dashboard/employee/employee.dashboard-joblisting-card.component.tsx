import {
  faBriefcase,
  faClipboard,
  faIndianRupeeSign,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DashboardEmployerCardData } from "../../../features/dashboard.sice";

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
    <div className="w-full border p-4 border-black rounded-md bg-lightGray shadow-lg flex gap-4 items-center">
      <div className="bg-white w-48 p-8 rounded-md">
        <img
          src={companyImage ?? ""}
          alt={companyName ?? ""}
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-start">
        <p className="text-lg font-semibold">{jobTitle}</p>
        <p className="text-xs font-normal">{domain}</p>
        <p className="text-xs font-normal mt-2">{skills.toString()}</p>
        <p className="text-xs font-normal mb-4 mt-2">{subDomain.toString()}</p>
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
      </div>
    </div>
  );
};

export default EmployeeDashboardJobLisitingCard;
