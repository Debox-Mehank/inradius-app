import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import {
  PageHeading,
  PageSubHeading,
} from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

interface EmployeeDomainEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeDomainEdit = ({ setEditModals }: EmployeeDomainEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allDomains = useSelector((state: RootState) => state.common.allDomains);
  const domain = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.domain
  );

  const submitHandler = async () => {
    if (domain === null) {
      toast.info("Select domain to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: { input: { domain: domain?._id, subDomain: [] } },
    });
    dispatch(toggleLoading());
    if (errors !== undefined) {
      toast.error(errors[0].message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (data === undefined) {
      toast.error("Something went wrong!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    toast.success("Domain Updated Successfully!", {
      hideProgressBar: true,
      autoClose: 1500,
    });
    setEditModals(undefined);
  };

  return (
    <div
      data-aos="fade-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center px-8"
    >
      <div className="flex flex-col max-w-xl w-full h-full justify-center">
        <PageHeading text={"Domain"} />
        <div className="flex flex-col justify-start">
          <PageSubHeading text="Choose Domain" />

          <div className="flex flex-row gap-4 flex-wrap">
            {allDomains.map((i, idx) => (
              <p
                key={idx}
                className={`${
                  i._id === domain?._id
                    ? "bg-primary text-white"
                    : "bg-lightGray text-black"
                } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => {
                  if (domain !== null) {
                    if (domain?._id !== i._id) {
                      dispatch(
                        updateDashboardEmployeeData({
                          domain: i,
                          subDomain: [],
                        })
                      );
                    }
                  } else {
                    dispatch(
                      updateDashboardEmployeeData({
                        domain: i,
                      })
                    );
                  }
                }}
              >
                {i.domain}
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="1x"
                  className={`${
                    i._id === domain?._id ? "block" : "hidden"
                  } text-white`}
                />
              </p>
            ))}
          </div>
        </div>
        {/* <Select<{ _id: string; location: string }>
          options={allLocations}
          getOptionLabel={(location: { _id: string; location: string }) =>
            location.location
          }
          getOptionValue={(location: { _id: string; location: string }) =>
            location._id
          }
          className="w-full"
          placeholder="Select Location..."
          value={location}
          onChange={(value) => {
            dispatch(updateEmployeeData({ location: value }));
          }}
          styles={reactSelectColorStyles}
        /> */}
        <div className="flex flex-row gap-2 justify-center select-none my-6">
          <button
            type="submit"
            className={`w-max text-xs bg-white p-2 text-primary border border-primary grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              //   setShowRadiusConfirmModal(false);
              setEditModals(undefined);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-max text-xs bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              submitHandler();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDomainEdit;
