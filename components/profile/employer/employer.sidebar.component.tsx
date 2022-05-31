import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Maybe } from "../../../generated/graphql";
import SidebarItem from "../common/sidebaritem.component";

interface EmployerSidebarProps {
  firstName: string;
  lastName: string;
  image?: Maybe<string | undefined>;
}

const EmployerSidebar = ({
  firstName,
  lastName,
  image,
}: EmployerSidebarProps) => {
  const employerSlice = useSelector((state: RootState) => state.employer);

  return (
    <div className="w-full h-full col-span-2 bg-darkGray text-white flex flex-col justify-between items-center">
      <div className="pt-8 pb-4 px-8">
        <div className="w-36 h-36 rounded-full">
          <CircularProgressbarWithChildren
            value={employerSlice.currentProgress}
            strokeWidth={5}
            minValue={0}
            maxValue={100}
            background={true}
            styles={buildStyles({
              backgroundColor: `${
                employerSlice.currentProgress.toFixed(1) === "100.0"
                  ? "#e55d29"
                  : "transparent"
              }`,
              textColor: "white",
              pathColor: "#e55d29",
              trailColor: "#e7e7e7",
              textSize: "14px",
              strokeLinecap: "rounded",
            })}
          >
            {employerSlice.currentProgress.toFixed(1) === "100.0" ? (
              <FontAwesomeIcon icon={faCheckCircle} size="4x" />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-white">{`${employerSlice.currentProgress.toFixed(
                  1
                )}%`}</p>
                {/* <p className="text-md font-medium text-white">Progress</p> */}
              </div>
            )}
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4 justify-start items-start pb-6 pt-4 px-6">
        {employerSlice.employer.companyName ? (
          <SidebarItem text={employerSlice.employer.companyName} />
        ) : (
          <SidebarItem text={localStorage.getItem("companyName")!} />
        )}
        {employerSlice.employer.benefits && (
          <>
            {employerSlice.employer.benefits.map((bene, idx) => (
              <SidebarItem key={idx} text={bene.label} />
            ))}
          </>
        )}
        {employerSlice.employer.lastTurnover && (
          <SidebarItem
            text={`₹ ${employerSlice.employer.lastTurnover
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          />
        )}
      </div>
      <div className="bg-primary p-6 w-full justify-self-end flex justify-center items-center gap-4 rounded-t-md">
        {image ? (
          <div className="w-12 h-12 rounded-full bg-white text-black font-bold grid place-items-center">
            {/* {firstName.split("")[0] + lastName.split("")[0]} */}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-white text-black font-bold grid place-items-center">
            {firstName.split("")[0] + lastName.split("")[0]}
          </div>
        )}
        <p className="text-md font-medium text-white">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};

export default EmployerSidebar;
