import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployerData } from "../../../features/employer.slice";
import {
  useUpdateEmployerMutation,
  useUpdateProfileStatusLazyQuery,
} from "../../../generated/graphql";
import { PageHeading } from "../common/heading.component";
import EmployerNextButton from "./employer.nextbutton.component";
import EmployerPrevButton from "./employer.prevbutton.component";

const numWords = require("num-words");

const EmployerCompanyMiscellaneousInfo = () => {
  const router = useRouter();

  const [updateEmployerMutation] = useUpdateEmployerMutation();
  const [updateProfileStatusQuery] = useUpdateProfileStatusLazyQuery();

  const dispatch = useDispatch();

  const noOfLocations = useSelector(
    (state: RootState) => state.employer.employer.noOfLocations
  );
  const noOfHiring = useSelector(
    (state: RootState) => state.employer.employer.noOfHiring
  );
  const landline = useSelector(
    (state: RootState) => state.employer.employer.landline
  );
  const lastTurnover = useSelector(
    (state: RootState) => state.employer.employer.lastTurnover
  );
  const attritionRate = useSelector(
    (state: RootState) => state.employer.employer.attritionRate
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    // Update Employee Data
    dispatch(toggleLoading());

    const { data, errors } = await updateEmployerMutation({
      variables: {
        input: {
          noOfLocations: noOfLocations,
          noOfHiring: noOfHiring,
          landline: landline,
          lastTurnover: lastTurnover,
          attritionRate: attritionRate,
        },
      },
    });

    const { data: updateData, error: updateError } =
      await updateProfileStatusQuery();

    dispatch(toggleLoading());

    if (updateError !== undefined) {
      toast.error(updateError.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (updateData === undefined || updateData.updateProfileStatus === false) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

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

    toast.success("Congragulations on completing profile!", {
      autoClose: 2000,
      hideProgressBar: true,
    });

    moveNext();

    dispatch(toggleLoading());

    setTimeout(() => {
      router.replace("/dashboard?page=explore");
      dispatch(toggleLoading());
    }, 2000);
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
        <PageHeading text={"Company Miscellaneous Info"} desc={""} />
        <p className="text-xs w-full text-center text-gray-500 font-medium mb-4">
          {
            "These fields are optional, fill all the details for searching good talents."
          }
        </p>
        <div className="flex flex-row gap-4 flex-wrap">
          <div className="flex flex-col justify-start w-full">
            {noOfLocations && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Number of Locations`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Number of Locations"}
              autoComplete="off"
              value={noOfLocations ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    noOfLocations:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {noOfHiring && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Hiring for current year`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Hiring for current year"}
              autoComplete="off"
              value={noOfHiring ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    noOfHiring:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {landline && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Landline Number`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Landline Number"}
              autoComplete="off"
              value={landline ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    landline:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {lastTurnover && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Last year's turnover`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Company's Turnover"}
              autoComplete="off"
              value={lastTurnover ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    lastTurnover:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  })
                );
              }}
            />
            {lastTurnover && lastTurnover !== null && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mt-2 capitalize">
                {numWords(lastTurnover)}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-start w-full">
            {attritionRate && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Attrition Rate`}
              </p>
            )}
            <input
              type={"number"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Attrition Rate"}
              autoComplete="off"
              value={attritionRate ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployerData({
                    attritionRate:
                      e.target.value === "" ? null : parseInt(e.target.value),
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

export default EmployerCompanyMiscellaneousInfo;
