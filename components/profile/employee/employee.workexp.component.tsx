import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Switch from "react-switch";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import {
  DesignationEnum,
  useUpdateEmployeeMutation,
} from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeWorkExp = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const workExp = useSelector(
    (state: RootState) => state.employee.employee.workExp
  );
  const fresher = useSelector(
    (state: RootState) => state.employee.employee.fresher
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!fresher && workExp) {
      if (workExp.length < 1) {
        toast.info("You need to add atleast one work experience.", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      } else {
        for (let index = 0; index < workExp.length; index++) {
          const w = workExp[index];
          if (!w.company || !w.desc || !w.start || (!w.current && !w.end)) {
            toast.info("Please fill all the details", {
              autoClose: 2000,
              hideProgressBar: true,
            });
            return;
          }
        }
      }
    }
    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: fresher
          ? {
              fresher: fresher,
              workExp: workExp!.map((el) => ({
                company: el.company!,
                desc: el.desc!,
                designation: DesignationEnum.Techlead,
                start: new Date(el.start ?? ""),
                end: el.current ?? false ? null : new Date(el.end ?? ""),
                current: el.current ?? false,
              })),
              totalExp: null,
              relevantExp: null,
            }
          : {
              fresher: fresher,
              workExp: workExp!.map((el) => ({
                company: el.company!,
                desc: el.desc!,
                designation: DesignationEnum.Techlead,
                start: new Date(el.start ?? ""),
                end: el.current ?? false ? null : new Date(el.end ?? ""),
                current: el.current ?? false,
              })),
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
      <div className="flex flex-col max-w-xl w-full h-full justify-center">
        <PageHeading
          text={"Past Work Experience"}
          desc={
            "You can add upto 3 past work experiences, if you are fresher turn on the switch below."
          }
        />
        <div className="flex flex-row justify-center items-center w-full gap-5">
          <p className="text-sm w-full text-right text-darkGray font-semibold mb-1">
            {`Are you a fresher?`}
          </p>
          <Switch
            checked={fresher ?? false}
            onChange={(e) => {
              if (e) {
                dispatch(
                  updateEmployeeData({
                    fresher: e,
                    workExp: [],
                    currentPay: null,
                    totalExp: null,
                    relevantExp: null,
                  })
                );
              } else {
                const myWorkExp = [...(workExp ?? [])];
                myWorkExp.push({
                  company: null,
                  current: null,
                  desc: null,
                  designation: null,
                  end: null,
                  start: null,
                });
                dispatch(
                  updateEmployeeData({ fresher: e, workExp: myWorkExp })
                );
              }
            }}
            offColor={"#e7e7e7"}
            onColor={"#e55d29"}
            checkedIcon={<></>}
            uncheckedIcon={<></>}
            handleDiameter={15}
            height={24}
            width={40}
            className="w-full justify-start d-flex-imp items-center"
          />
        </div>
        {fresher ? null : (
          <>
            <div className="flex flex-col gap-5 justify-start items-center w-full max-h-96 overflow-auto">
              <PageSubHeading text="All experience" />
              {workExp?.map((exp, idx) => {
                return (
                  <div
                    className="flex flex-col justify-center gap-2 items-center w-full"
                    key={idx}
                  >
                    <p className="text-sm w-full text-justify text-darkGray font-semibold mb-1">
                      {`Experience ${idx + 1}`}
                    </p>
                    <div className="flex flex-col justify-start w-full">
                      {exp.company && (
                        <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                          {`Company Name`}
                        </p>
                      )}
                      <input
                        type={"text"}
                        className={`bg-lightGray px-1 py-3 lg:px-2 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
                        placeholder={"Company Name"}
                        autoComplete="off"
                        value={exp.company ?? ""}
                        onChange={(e) => {
                          const myWorkExp = workExp.map((el, i) => {
                            if (i === idx) {
                              return {
                                ...el,
                                company: e.target.value.toString(),
                              };
                            }
                            return el;
                          });
                          dispatch(
                            updateEmployeeData({
                              workExp: myWorkExp,
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      {exp.desc && (
                        <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                          {`Short Description`}
                        </p>
                      )}
                      <input
                        type={"text"}
                        className={`bg-lightGray px-1 py-3 lg:px-2 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
                        placeholder={
                          "Short description of your role in the company"
                        }
                        autoComplete="off"
                        value={exp.desc ?? ""}
                        onChange={(e) => {
                          const myWorkExp = workExp.map((el, i) => {
                            if (i === idx) {
                              return { ...el, desc: e.target.value.toString() };
                            }
                            return el;
                          });
                          dispatch(
                            updateEmployeeData({
                              workExp: myWorkExp,
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                        {`Currently Working Here`}
                      </p>
                      <Switch
                        checked={exp.current ?? false}
                        onChange={(e) => {
                          const myWorkExp = workExp.map((el, i) => {
                            if (i === idx) {
                              return { ...el, current: e, end: null };
                            }
                            return el;
                          });
                          dispatch(
                            updateEmployeeData({
                              workExp: myWorkExp,
                            })
                          );
                        }}
                        offColor={"#e7e7e7"}
                        onColor={"#e55d29"}
                        checkedIcon={<></>}
                        uncheckedIcon={<></>}
                        handleDiameter={15}
                        height={24}
                        width={40}
                        className="w-full justify-start d-flex-imp items-center"
                      />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      {exp.start && (
                        <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                          {`Start Date`}
                        </p>
                      )}
                      <input
                        type={"date"}
                        className={`bg-lightGray px-1 py-3 lg:px-2 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
                        placeholder={"Start Date"}
                        autoComplete="off"
                        value={exp.start ?? ""}
                        onChange={(e) => {
                          const myWorkExp = workExp.map((el, i) => {
                            if (i === idx) {
                              if (exp.end) {
                                if (
                                  new Date(e.target.value).getTime() >
                                  new Date(exp.end).getTime()
                                ) {
                                  toast.info(
                                    "Start date must be before end date.",
                                    { autoClose: 2000, hideProgressBar: true }
                                  );
                                  return el;
                                }
                              }
                              return { ...el, start: e.target.value };
                            }
                            return el;
                          });
                          dispatch(
                            updateEmployeeData({
                              workExp: myWorkExp,
                            })
                          );
                        }}
                      />
                    </div>
                    {!exp.current ? (
                      <div className="flex flex-col justify-start w-full">
                        {exp.end && (
                          <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                            {`End Date`}
                          </p>
                        )}
                        <input
                          type={"date"}
                          className={`bg-lightGray px-1 py-3 lg:px-2 rounded-md focus-visible:outline-none text-xs font-semibold w-full`}
                          placeholder={"End Date"}
                          autoComplete="off"
                          value={exp.end ?? ""}
                          onChange={(e) => {
                            const myWorkExp = workExp!.map((el, i) => {
                              if (i === idx) {
                                if (el.start) {
                                  if (
                                    new Date(
                                      el.start?.toString() ?? ""
                                    ).getTime() >
                                    new Date(e.target.value).getTime()
                                  ) {
                                    toast.info(
                                      "End date must be after start date.",
                                      { autoClose: 2000, hideProgressBar: true }
                                    );
                                    return el;
                                  }
                                }
                                return { ...el, end: e.target.value };
                              }
                              return el;
                            });
                            dispatch(
                              updateEmployeeData({
                                workExp: myWorkExp,
                              })
                            );
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row gap-2 justify-end select-none mt-6 mb-2">
              <p
                onClick={() => {
                  const myWorkExp = [...(workExp ?? [])];
                  if (myWorkExp.length < 3) {
                    myWorkExp.push({
                      company: null,
                      current: null,
                      desc: null,
                      designation: null,
                      end: null,
                      start: null,
                    });
                    dispatch(updateEmployeeData({ workExp: myWorkExp }));
                  } else {
                    toast.info(
                      "Maximum number of experience that can be added is 3!",
                      { autoClose: 2000, hideProgressBar: true }
                    );
                    return;
                  }
                }}
              >
                Add
              </p>
              <p
                onClick={() => {
                  const myWorkExp = [...(workExp ?? [])];
                  if (myWorkExp.length === 1) {
                    toast.info("Minimum 1 experience is required!", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }
                  myWorkExp.pop();
                  dispatch(updateEmployeeData({ workExp: myWorkExp }));
                }}
              >
                Remove
              </p>
            </div>
          </>
        )}
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeWorkExp;
