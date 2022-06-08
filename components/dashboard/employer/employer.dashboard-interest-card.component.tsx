import {
  faBookmark,
  faBriefcase,
  faClipboard,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DashboardEmployeeCardData,
  InterestsEmployeeCardData,
} from "../../../features/dashboard.sice";
import ReusableButton from "../../reusables/ReusableButton";

const EmployerInterestCard = ({
  data: {
    firstName,
    lastName,
    userImage,
    expectedPay,
    skills,
    location,
    domain,
    subDomain,
    employeeId,
  },
}: //   interestHandler,
//   notInterestHandler,
{
  data: InterestsEmployeeCardData;
  //   interestHandler: (employeeId: string) => void;
  //   notInterestHandler: (employeeId: string) => void;
}) => {
  return (
    <div className="w-full max-w-3xl border border-gray-300 p-8 rounded-3xl bg-white flex gap-8 items-center my-6">
      <div className="bg-white rounded-3xl border border-gray-300">
        <img
          src={userImage ?? ""}
          alt={firstName ?? ""}
          className="object-cover object-top w-44 h-44 rounded-lg"
        />
      </div>
      <div className="flex-1 flex w-full h-full flex-col justify-center">
        <p className="text-lg font-semibold">
          {firstName} {lastName}
        </p>
        <p className="text-xs font-normal">{domain}</p>
        {/* <p className="text-xs font-normal mt-2">{skills.toString()}</p>
        <p className="text-xs font-normal mb-4 mt-2">{subDomain.toString()}</p> */}
        {/* <p className="text-xs font-normal mt-2">
          <FontAwesomeIcon
            icon={faClipboard}
            size={"lg"}
            className="text-primary mr-2"
          />
          {jobDesc}
        </p> */}
        <div className="flex justify-start items-center gap-4">
          {/* {minRequiredExp && (
            <p className="text-xs font-normal mt-3">
              <FontAwesomeIcon
                icon={faBriefcase}
                size={"lg"}
                className="text-primary mr-2"
              />
              {minRequiredExp.years} year {minRequiredExp.months} months
            </p>
          )} */}
          <p className="text-xs font-normal mt-3">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              size={"lg"}
              className="text-primary mr-2"
            />
            {(expectedPay ?? 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {/* {(maxPay ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
          </p>
        </div>
        {/* <div className="flex justify-start items-center gap-4 mt-6">
          <ReusableButton
            bg="bg-primary w-full"
            text="text-white"
            title="Interested"
            size="small"
            onClick={() => {
              interestHandler(employeeId ?? "");
            }}
          />
          <ReusableButton
            bg="bg-white w-full border border-black"
            text="text-black"
            title="Not Interested"
            size="small"
            onClick={() => {
              notInterestHandler(employeeId ?? "");
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
        </div> */}
      </div>
    </div>
  );
};

export default EmployerInterestCard;
