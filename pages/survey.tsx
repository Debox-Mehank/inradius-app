import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import Logo from "../components/reusables/Logo";
import ReusableButton from "../components/reusables/ReusableButton";
import { toggleLoading } from "../features/common.slice";
import {
  nextSurvey,
  prevSurvey,
  setSurveyLists,
  addSurvey,
} from "../features/survey.slice";
import {
  //   Survey,
  SurveyType,
  useAllSurveyQuestionLazyQuery,
  User,
  UserRole,
  UserSurveyInput,
  useUpdateEmployeeMutation,
  useUpdateSurveyStatusLazyQuery,
} from "../generated/graphql";

const Survey: NextPage = () => {
  const surveySlice = useSelector((state: RootState) => state.survey);
  const dispatch = useDispatch();

  const router = useRouter();

  const [surveyQuery] = useAllSurveyQuestionLazyQuery();
  const [updateSurveyStatusQuery] = useUpdateSurveyStatusLazyQuery();
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  useEffect(() => {
    const myFunc = async () => {
      const { firstName, lastName, image, type }: User = JSON.parse(
        localStorage.getItem("user")!
      );

      if (type === UserRole.Employee) {
        dispatch(toggleLoading());
        const { data: employeeSurveyQuestions, error: employeeSurveyError } =
          await surveyQuery({
            variables: { type: SurveyType.Employee },
          });
        dispatch(toggleLoading());

        if (employeeSurveyError !== undefined) {
          toast.error(employeeSurveyError.message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        if (employeeSurveyQuestions !== undefined) {
          dispatch(setSurveyLists(employeeSurveyQuestions.allSurveyQuestion));
        }
      } else if (type === UserRole.Employer) {
        dispatch(toggleLoading());
        const { data: employerSurveyQuestions, error: employerSurveyError } =
          await surveyQuery({
            variables: { type: SurveyType.Employer },
          });
        dispatch(toggleLoading());

        if (employerSurveyError !== undefined) {
          toast.error(employerSurveyError.message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return null;
        }

        if (employerSurveyQuestions !== undefined) {
          dispatch(setSurveyLists(employerSurveyQuestions.allSurveyQuestion));
        }
      }
    };
    myFunc();
  }, [dispatch, surveyQuery]);

  const submitSurveys = async () => {
    const { type }: User = JSON.parse(localStorage.getItem("user")!);

    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: { input: { userSurvey: surveySlice.surveys } },
    });

    if (errors !== undefined) {
      toast.error(errors[0].message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(toggleLoading());
      return null;
    }

    if (data === undefined) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(toggleLoading());
      return null;
    }

    // Update User Survey Status
    const { data: updateData, error: updateError } =
      await updateSurveyStatusQuery();

    if (updateError !== undefined) {
      toast.error(updateError.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(toggleLoading());
      return null;
    }

    if (updateData === undefined || updateData.updateSurveyStatus === false) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(toggleLoading());
      return null;
    }

    dispatch(toggleLoading());
    toast.success("Congragulation on completing survey!", {
      autoClose: 2000,
      hideProgressBar: true,
    });

    if (type === UserRole.Employee) {
      router.replace("/employee-profile?page=location");
    } else if (type === UserRole.Employer) {
      router.replace("/employer-profile");
    }
  };

  return (
    <div className="h-full w-full grid place-items-center relative">
      {/* Logo White */}
      <div className="z-40 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0">
        <div className="z-40 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28">
          <Logo />
        </div>
      </div>

      <div className="max-w-2xl flex justify-center items-center">
        {surveySlice.surveyLists.map((survey, idx) => {
          return (
            <div
              key={idx}
              className={`w-full${
                surveySlice.surveyIndex === idx ? " flex flex-col" : " hidden"
              }`}
            >
              <h4 className="text-justify font-bold text-lg lg:text-2xl py-2">
                {survey.question}
              </h4>
              <br />
              <div className="flex flex-col justify-center items-center gap-5">
                {survey.options.map((option, opIdx) => {
                  return (
                    <div
                      key={opIdx}
                      className={`${
                        surveySlice.surveys.findIndex(
                          (el) =>
                            el.selectedOption === option &&
                            el.survey === survey._id
                        ) !== -1
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-black"
                      } rounded-md py-4 px-10 w-full`}
                      onClick={() => {
                        dispatch(
                          addSurvey({
                            selectedOption: option,
                            survey: survey._id,
                          })
                        );
                      }}
                    >
                      {opIdx + 1}. {option}
                    </div>
                  );
                })}
              </div>
              <br />
              <div className="flex justify-center items-center gap-5">
                {surveySlice.surveyIndex > 0 ? (
                  <>
                    <ReusableButton
                      bg="bg-primary"
                      text="text-white"
                      title="Previous"
                      onClick={() => {
                        dispatch(prevSurvey());
                      }}
                    />
                    <ReusableButton
                      bg="bg-primary"
                      text="text-white"
                      title={
                        surveySlice.surveyIndex ===
                        surveySlice.surveyLists.length - 1
                          ? "Submit"
                          : "Next"
                      }
                      onClick={() => {
                        if (
                          surveySlice.surveyIndex ===
                          surveySlice.surveyLists.length - 1
                        ) {
                          // Submit
                          submitSurveys();
                        } else {
                          dispatch(nextSurvey());
                        }
                      }}
                    />
                  </>
                ) : (
                  <ReusableButton
                    bg="bg-primary"
                    text="text-white"
                    title="Next"
                    onClick={() => {
                      dispatch(nextSurvey());
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Survey;
