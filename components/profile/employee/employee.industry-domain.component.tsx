import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { useUpdateEmployeeMutation } from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeIndustryDomain = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const allIndustries = useSelector(
    (state: RootState) => state.common.allIndustries
  );
  const allDomains = useSelector((state: RootState) => state.common.allDomains);

  const industry = useSelector(
    (state: RootState) => state.employee.employee.industry
  );
  const domain = useSelector(
    (state: RootState) => state.employee.employee.domain
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (industry === null) {
      toast.info("Select industry to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

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
      variables: { input: { industry: industry?._id, domain: domain?._id } },
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
      <div className="flex flex-col max-w-xl w-full h-full justify-center">
        <PageHeading text={"Industry & Domain"} />
        <div className="flex flex-col justify-start">
          <PageSubHeading text="Choose Industry" />

          <div className="flex flex-row gap-4 flex-wrap">
            {allIndustries.map((i, idx) => (
              <p
                key={idx}
                className={`${
                  i._id === industry?._id
                    ? "bg-primary text-white"
                    : "bg-lightGray text-black"
                } rounded-full py-2 px-3 font-normal text-xs transition-all flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => {
                  dispatch(updateEmployeeData({ industry: i }));
                }}
              >
                {i.industry}
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="1x"
                  className={`${
                    i._id === industry?._id ? "block" : "hidden"
                  } text-white`}
                />
              </p>
            ))}
          </div>
        </div>
        <br />
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
                        updateEmployeeData({
                          domain: i,
                          subDomain: undefined,
                          skills: [],
                        })
                      );
                    }
                  } else {
                    dispatch(
                      updateEmployeeData({
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
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeIndustryDomain;
