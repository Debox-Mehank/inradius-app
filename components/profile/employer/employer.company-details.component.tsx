import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployerData } from "../../../features/employer.slice";
import {
  EmployerVerifyStatusEnum,
  User,
  useUpdateEmployerMutation,
} from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployerNextButton from "./employer.nextbutton.component";
import EmployerPrevButton from "./employer.prevbutton.component";
import { reactMultiSelectColorStyles } from "../../../utils/common";

const EmployerCompanyDetails = () => {
  const [updateEmployerMutation] = useUpdateEmployerMutation();

  const dispatch = useDispatch();

  const allBenefits = useSelector(
    (state: RootState) => state.common.allBenefits
  );

  const benefits = useSelector(
    (state: RootState) => state.employer.employer.benefits
  );
  const linkedIn = useSelector(
    (state: RootState) => state.employer.employer.linkedIn
  );
  const currentAddress = useSelector(
    (state: RootState) => state.employer.employer.currentAddress
  );
  const registeredAddress = useSelector(
    (state: RootState) => state.employer.employer.registeredAddress
  );
  const noOfEmployees = useSelector(
    (state: RootState) => state.employer.employer.noOfEmployees
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    // Check Benefits
    if (!benefits) {
      toast.info("Please provide your company's benefit!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check LinkedIn
    if (!linkedIn) {
      toast.info("Please provide your company linkedin profile!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Current Address
    if (!currentAddress) {
      toast.info("Please provide your current address!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Registered Address
    if (!registeredAddress) {
      toast.info("Please provide your registered address!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check No of Employees
    if (!noOfEmployees) {
      toast.info("Please provide total strength of your company!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employee Data
    dispatch(toggleLoading());

    const { data, errors } = await updateEmployerMutation({
      variables: {
        input: {
          benefits: benefits.map((el) => el.value),
          linkedIn: linkedIn,
          currentAddress: currentAddress,
          registeredAddress: registeredAddress,
          noOfEmployees: noOfEmployees,
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

    moveNext();
  };

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-xl w-full">
        <PageHeading text={"Company Details"} />
        <div className="flex flex-row gap-4 flex-wrap">
          <div className="flex flex-col justify-start w-full">
            {(benefits ?? []).length > 0 && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-2">
                Choose Benefits
              </p>
            )}
            <Select<{ _id: string; benefit: string }, true>
              options={allBenefits.map((el) => ({
                _id: el._id,
                benefit: el.benefit,
              }))}
              getOptionLabel={(benefit: { _id: string; benefit: string }) =>
                benefit.benefit
              }
              getOptionValue={(benefit: { _id: string; benefit: string }) =>
                benefit._id
              }
              className="w-full"
              placeholder="Select Benefits"
              value={benefits?.map((el) => ({
                _id: el.value,
                benefit: el.label,
              }))}
              isMulti
              onChange={(
                value: MultiValue<{ _id: string; benefit: string }>
              ) => {
                dispatch(
                  updateEmployerData({
                    benefits: value.map((el) => ({
                      label: el.benefit,
                      value: el._id,
                    })),
                  })
                );
              }}
              styles={reactMultiSelectColorStyles}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {linkedIn && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`LinkedIn`}
              </p>
            )}
            <input
              type={"text"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Company Linkedin Profile"}
              autoComplete="off"
              value={linkedIn ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    linkedIn: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {currentAddress && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Current Address`}
              </p>
            )}
            <input
              type={"text"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Current Address"}
              autoComplete="off"
              value={currentAddress ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    currentAddress: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {registeredAddress && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Registered Address`}
              </p>
            )}
            <input
              type={"text"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Registered Address"}
              autoComplete="off"
              value={registeredAddress ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    registeredAddress: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {noOfEmployees && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Total Company's Strength`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Total Company Strength"}
              autoComplete="off"
              value={noOfEmployees ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    noOfEmployees:
                      e.target.value !== "" ? parseInt(e.target.value) : null,
                  })
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployerPrevButton handlerFunction={prevHandler} />
          <EmployerNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployerCompanyDetails;
