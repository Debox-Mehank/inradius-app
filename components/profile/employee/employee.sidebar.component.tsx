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

interface EmployeeSidebarProps {
  firstName: string;
  lastName: string;
  image?: Maybe<string | undefined>;
}

const EmployeeSidebar = ({
  firstName,
  lastName,
  image,
}: EmployeeSidebarProps) => {
  const employeeSlice = useSelector((state: RootState) => state.employee);

  return (
    <div className="w-full h-full col-span-2 bg-darkGray text-white flex flex-col justify-between items-center">
      <div className="pt-8 pb-4 px-8">
        <div className="w-36 h-36 rounded-full">
          <CircularProgressbarWithChildren
            value={employeeSlice.currentProgress}
            strokeWidth={5}
            minValue={0}
            maxValue={100}
            background={true}
            styles={buildStyles({
              backgroundColor: `${
                employeeSlice.currentProgress.toFixed(1) === "100.0"
                  ? "#ff4100"
                  : "transparent"
              }`,
              textColor: "white",
              pathColor: "#ff4100",
              trailColor: "#e7e7e7",
              textSize: "14px",
              strokeLinecap: "rounded",
            })}
          >
            {employeeSlice.currentProgress.toFixed(1) === "100.0" ? (
              <FontAwesomeIcon icon={faCheckCircle} size="4x" />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-white">{`${employeeSlice.currentProgress.toFixed(
                  1
                )}%`}</p>
                {/* <p className="text-md font-medium text-white">Progress</p> */}
              </div>
            )}
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4 justify-start items-start pb-6 pt-4 px-6">
        {employeeSlice.employee.location && (
          <SidebarItem text={employeeSlice.employee.location.location} />
        )}
        {employeeSlice.employee.radius && (
          <SidebarItem text={employeeSlice.employee.radius + " km"} />
        )}
        {employeeSlice.employee.industry && (
          <SidebarItem text={employeeSlice.employee.industry.industry} />
        )}
        {employeeSlice.employee.domain && (
          <SidebarItem text={employeeSlice.employee.domain.domain} />
        )}
        {employeeSlice.employee.subDomain && (
          <>
            {employeeSlice.employee.subDomain.map((sd, idx) => (
              <SidebarItem key={idx} text={sd.subDomain} />
            ))}
          </>
        )}
        {employeeSlice.employee.skills && (
          <>
            {employeeSlice.employee.skills.map((skill, idx) => (
              <SidebarItem key={idx} text={skill.label} />
            ))}
          </>
        )}
        {employeeSlice.employee.qualification && (
          <SidebarItem
            text={employeeSlice.employee.qualification.qualification}
          />
        )}
        {/* {employeeSlice.employee.relevantExp && (
          <SidebarItem
            text={`${employeeSlice.employee.relevantExp.years.value} year ${employeeSlice.employee.relevantExp.months.value} months`}
          />
        )} */}
        {employeeSlice.employee.expectedPay && (
          <SidebarItem
            text={`₹ ${employeeSlice.employee.expectedPay
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

export default EmployeeSidebar;
