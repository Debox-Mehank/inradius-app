import {
  faBookmark,
  faBriefcase,
  faBusinessTime,
  faClipboard,
  faIndianRupeeSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  DashboardEmployerCardData,
  InterestsEmployerCardData,
} from "../../../features/dashboard.sice";
import ReusableButton from "../../reusables/ReusableButton";

const EmployeeInterestCard = ({
  data: {
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
    employerId,
    jobId,
  },
  shownInterest = false,
  interestHandler,
  notInterestHandler,
}: {
  data: InterestsEmployerCardData;
  shownInterest?: boolean;
  interestHandler?: (employerId: string, jobId: string) => void;
  notInterestHandler?: (employerId: string, jobId: string) => void;
}) => {
  return (
    <div className="w-full max-w-3xl border border-gray-300 p-8 rounded-3xl bg-white flex gap-8 items-center my-4">
      <div className="bg-white px-8 py-8 rounded-3xl border border-gray-300">
        <Image
          src={companyImage ?? ""}
          alt={companyName ?? ""}
          className="object-contain w-32 h-32"
          width={115}
          height={115}
        />
      </div>
      <div className="flex-1 w-full h-full flex flex-col justify-start">
        <p className="text-lg font-semibold">{companyName}</p>
        <p className="text-xs font-normal">{jobTitle}</p>
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
        <div className="flex justify-start items-center gap-4">
          <p className="text-xs font-normal mt-3">
            <FontAwesomeIcon
              icon={faLocationDot}
              size={"lg"}
              className="text-primary mr-2"
            />
            {`${location}`}
          </p>
          <p className="text-xs font-normal mt-3">
            <FontAwesomeIcon
              icon={faBusinessTime}
              size={"lg"}
              className="text-primary mr-2"
            />
            {`${jobType}`}
          </p>
        </div>
        {shownInterest && (
          <div className="flex justify-start items-center gap-4 mt-6">
            <ReusableButton
              bg="bg-primary w-full"
              text="text-white"
              title="Interested"
              size="small"
              onClick={() => {
                if (interestHandler) {
                  interestHandler(employerId ?? "", jobId ?? "");
                }
              }}
            />
            <ReusableButton
              bg="bg-white w-full border border-black"
              text="text-black"
              title="Not Interested"
              size="small"
              onClick={() => {
                if (notInterestHandler) {
                  notInterestHandler(employerId ?? "", jobId ?? "");
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInterestCard;
