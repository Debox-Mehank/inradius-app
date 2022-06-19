import { faPowerOff, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import {
  setInitialStateCommonSlice,
  toggleLoading,
} from "../../../features/common.slice";
import {
  DashboardPagesEnum,
  setCurrentPage,
  setInitialStateDashboardSlice,
} from "../../../features/dashboard.sice";
import { setInitialStateEmployeeSlice } from "../../../features/employee.slice";
import { setInitialStateEmployerSlice } from "../../../features/employer.slice";
import { setInitialStateJobSlice } from "../../../features/job.slice";
import { setInitialStateSurveySlice } from "../../../features/survey.slice";
import { useLogoutLazyQuery, User, UserRole } from "../../../generated/graphql";
import LogoWhite from "../../reusables/LogoWhite";

interface DashboardSidebarProps {
  list: { title: string; page: DashboardPagesEnum; icon: IconDefinition }[];
}

const DashboardSidebar = ({ list }: DashboardSidebarProps) => {
  const router = useRouter();

  const [logoutQuery] = useLogoutLazyQuery();

  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.dashboard.currentPage
  );

  const user = useSelector((state: RootState) => state.dashboard.dashboardUser);
  const dashboardEmployer = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer
  );

  const logoutHandler = async () => {
    try {
      dispatch(toggleLoading());
      const { data: logoutData, error: logoutError } = await logoutQuery();
      dispatch(toggleLoading());

      if (logoutError !== undefined) {
        toast.error(logoutError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }

      if (logoutData === undefined || logoutData.logout === false) {
        toast.error("Something went wrong!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }
      dispatch(setInitialStateCommonSlice());
      dispatch(setInitialStateDashboardSlice());
      dispatch(setInitialStateEmployeeSlice());
      dispatch(setInitialStateEmployerSlice());
      dispatch(setInitialStateJobSlice());
      dispatch(setInitialStateSurveySlice());
      localStorage.clear();
      router.replace("/login");
    } catch (error: any) {
      if (error) {
        toast.error(error.toString(), {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }
    }
  };

  return (
    <div
      className={`w-full h-full bg-darkGray text-white flex flex-col justify-start items-start col-span-2`}
    >
      {/* Logo */}
      <div className="self-center flex justify-center items-center w-28 h-28">
        <LogoWhite />
      </div>
      <div className="flex-1 flex flex-col w-full gap-5 px-5 mt-8">
        {list.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-row justify-start items-center px-4 py-3 w-full rounded-md transition cursor-pointer${
              item.page === currentPage ? " bg-primary" : ""
            }`}
            onClick={() => {
              dispatch(setCurrentPage(item.page));
              router.replace("/dashboard?page=" + item.page);
            }}
          >
            <FontAwesomeIcon icon={item.icon} size={"sm"} />
            <p className={`flex-1 px-3 text-xs`}>{item.title}</p>
          </div>
        ))}
      </div>
      {user &&
        (user.type === UserRole.Employee ? (
          <div
            className="bg-primary p-4 w-full flex justify-start items-center gap-4 rounded-t-md"
            onClick={() => {
              router.push("/dashboard?page=profile");
              dispatch(setCurrentPage(DashboardPagesEnum.profile));
            }}
          >
            {user.image ? (
              <div className="w-10 h-10 rounded-full bg-white text-black font-bold grid place-items-center text-xs">
                <Image
                  className="w-10 h-10 rounded-full object-contain object-center"
                  src={user.image}
                  alt={user.firstName.split("")[0] + user.lastName.split("")[0]}
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-black font-bold grid place-items-center text-xs">
                {user.firstName.split("")[0] + user.lastName.split("")[0]}
              </div>
            )}
            <p className="text-sm font-medium text-white flex-1">
              {user.firstName} {user.lastName}
            </p>
            <FontAwesomeIcon
              icon={faPowerOff}
              size={"lg"}
              className="cursor-pointer"
              onClick={logoutHandler}
            />
          </div>
        ) : (
          <div
            className="bg-primary p-4 w-full flex justify-start items-center gap-4 rounded-t-md"
            onClick={() => {
              router.push("/dashboard?page=profile");
              dispatch(setCurrentPage(DashboardPagesEnum.profile));
            }}
          >
            {dashboardEmployer?.companyImage ? (
              <div className="w-10 h-10 rounded-full bg-white text-black font-bold grid place-items-center text-xs">
                <Image
                  className="w-10 h-10 rounded-full object-contain object-center"
                  src={dashboardEmployer.companyImage}
                  alt={dashboardEmployer.companyName ?? ""}
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-black font-bold grid place-items-center text-xs">
                {(dashboardEmployer?.companyName ?? "").split("")[0]}
              </div>
            )}
            <p className="text-sm font-medium text-white flex-1">
              {dashboardEmployer?.companyName ?? ""}
            </p>
            <FontAwesomeIcon
              icon={faPowerOff}
              size={"lg"}
              className="cursor-pointer"
              onClick={logoutHandler}
            />
          </div>
        ))}
    </div>
  );
};

export default DashboardSidebar;
