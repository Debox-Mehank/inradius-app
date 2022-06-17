import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployeeData } from "../../../../features/dashboard.sice";
import { useUpdateEmployeeMutation } from "../../../../generated/graphql";
import {
  PageHeading,
  PageSubHeading,
} from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";
import { reactMultiSelectColorStyles } from "../../../../utils/common";

interface EmployeeSubDomainEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeSubDomainEdit = ({
  setEditModals,
}: EmployeeSubDomainEditProps) => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allSubdomains = useSelector(
    (state: RootState) => state.common.allSubdomains
  );

  const domain = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.domain
  );
  const subDomain = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployee?.subDomain
  );

  const submitHandler = async () => {
    if (!subDomain || subDomain.length === 0) {
      toast.info("Select sub-domain to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
          subDomain: subDomain.map((el) => el._id),
        },
      },
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

    toast.success("Sub-domain Updated Successfully!", {
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
        <PageHeading text={"Subdomain"} />
        <div className="flex flex-col justify-start">
          <PageSubHeading
            text="Select Subdomain"
            desc="Choose upto 3 sudomains!"
          />
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col justify-start w-full">
              {(subDomain ?? []).length > 0 && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                  Select Sub-domains
                </p>
              )}
              <Select<{ _id: string; subDomain: string }, true>
                options={allSubdomains
                  .filter((el) => el.domain._id === domain?._id)
                  .map((el) => ({
                    _id: el._id,
                    subDomain: el.subDomain,
                  }))}
                getOptionLabel={(subDomain: {
                  _id: string;
                  subDomain: string;
                }) => subDomain.subDomain}
                getOptionValue={(subDomain: {
                  _id: string;
                  subDomain: string;
                }) => subDomain._id}
                className="w-full"
                placeholder="Select Sub-domains"
                value={subDomain?.map((el) => ({
                  _id: el._id,
                  subDomain: el.subDomain,
                }))}
                isMulti
                onChange={(
                  value: MultiValue<{ _id: string; subDomain: string }>
                ) => {
                  if (value.length > 3) {
                    toast.info("Maximum 3 subdomains can be added!", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }
                  dispatch(
                    updateDashboardEmployeeData({
                      subDomain: value.map((el) => ({
                        _id: el._id,
                        subDomain: el.subDomain,
                      })),
                    })
                  );
                }}
                styles={reactMultiSelectColorStyles}
              />
            </div>
          </div>
        </div>
        <br />
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

export default EmployeeSubDomainEdit;
