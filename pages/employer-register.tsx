import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Logo from "../components/reusables/Logo";
import LogoWhite from "../components/reusables/LogoWhite";
import register_static from "../assets/register_static.png";
import ReusableButton from "../components/reusables/ReusableButton";
import PasswordField from "../components/reusables/PasswordField";
import { toggleLoading } from "../features/common.slice";
import { useRegisterMutation, UserRole } from "../generated/graphql";
import { GraphQLError } from "graphql";

export interface EmployerRegisterFormFields {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  number: string;
  password: string;
  cnfPassword: string;
}

const EmployerRegister: NextPage = () => {
  const [registerMutation] = useRegisterMutation();

  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployerRegisterFormFields>();

  const dispatch = useDispatch();

  const [success, setSuccess] = useState<boolean>(false);

  const submitHandler = async (data: EmployerRegisterFormFields) => {
    dispatch(toggleLoading());
    try {
      const { data: registerData, errors } = await registerMutation({
        variables: {
          input: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            number: data.number,
            password: data.password,
            type: UserRole.Employer,
          },
        },
      });

      if (errors) {
        toast.error(errors[0].message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return false;
      }

      localStorage.setItem("companyName", data.companyName);

      setSuccess(true);
    } catch (error) {
      const er = error as GraphQLError;
      toast.error(er.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    dispatch(toggleLoading());
  };

  return (
    <>
      {/* Page Header */}
      <Head>
        <title>Welcome to InRadius!</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen">
        {/* Logo */}
        <div className="z-40 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0 hidden lg:block">
          <div className="z-40 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28">
            <Logo />
          </div>
        </div>
        {/* Logo White */}
        <div className="z-40 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0 lg:hidden">
          <div className="z-40 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28">
            <LogoWhite />
          </div>
        </div>

        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Content */}
          <div className="w-full h-full bg-white hidden lg:flex flex-col">
            <div
              className="w-full flex items-end pt-16 px-16"
              style={{ height: "45%" }}
            >
              <h2 className="whitespace-pre-line text-2xl lg:text-3xl xl:text-4xl font-bold tracking-widest leading-relaxed mb-16">
                {"You don't have to do this\nyou "}{" "}
                <span className="text-primary">choose</span> {" to!"}
              </h2>
            </div>
            <div
              className=" w-full flex items-center justify-center p-12"
              style={{ height: "55%" }}
            >
              <div className="h-full w-full relative">
                <Image
                  alt=""
                  src={register_static}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="w-full h-full bg-darkGray flex flex-col justify-center items-center tracking-wide form-zIndex">
            <div className="max-w-md w-4/5">
              {!success ? (
                <>
                  {/* Registration Form */}
                  <form
                    className="w-full"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <h4
                      className={`text-2xl lg:text-3xl font-bold text-white text-center py-2`}
                    >
                      Employer Registration
                    </h4>
                    <br />
                    <div className="flex flex-col w-full gap-4 form-div-scrollable">
                      <div className="flex gap-4 items-end">
                        <div className="flex flex-col justify-start w-full">
                          {watch("firstName") !== "" &&
                            watch("firstName") !== undefined && (
                              <p className="text-sm text-white px-1 font-medium py-1">
                                {"First Name"}
                              </p>
                            )}
                          <input
                            type={"text"}
                            className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                            placeholder={"First Name*"}
                            {...fieldRegister("firstName", {
                              required: {
                                value: true,
                                message: "first name is required!",
                              },
                            })}
                            autoComplete="off"
                          />
                          {errors["firstName"] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">
                              {errors["firstName"]["message"]}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col justify-start w-full">
                          {watch("lastName") !== "" &&
                            watch("lastName") !== undefined && (
                              <p className="text-sm text-white px-1 font-medium py-1">
                                {"Last Name"}
                              </p>
                            )}
                          <input
                            type={"text"}
                            className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                            placeholder={"Last Name*"}
                            {...fieldRegister("lastName", {
                              required: {
                                value: true,
                                message: "last name is required!",
                              },
                            })}
                            autoComplete="off"
                          />
                          {errors["lastName"] && (
                            <p className="text-xs text-red-500 px-1 font-medium py-1">
                              {errors["lastName"]["message"]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-start w-full">
                        {watch("companyName") !== "" &&
                          watch("companyName") !== undefined && (
                            <p className="text-sm text-white px-1 font-medium py-1">
                              {"Company Name"}
                            </p>
                          )}
                        <input
                          type={"text"}
                          className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                          placeholder={"Company Name*"}
                          {...fieldRegister("companyName", {
                            required: {
                              value: true,
                              message: "company name is required!",
                            },
                          })}
                          autoComplete="off"
                        />
                        {errors["companyName"] && (
                          <p className="text-xs text-red-500 px-1 font-medium py-1">
                            {errors["companyName"]["message"]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-start w-full">
                        {watch("email") !== "" &&
                          watch("email") !== undefined && (
                            <p className="text-sm text-white px-1 font-medium py-1">
                              {"Company Email"}
                            </p>
                          )}
                        <input
                          type={"email"}
                          className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                          placeholder={"Company Email*"}
                          {...fieldRegister("email", {
                            required: {
                              value: true,
                              message: "email id is required!",
                            },
                            pattern: {
                              value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                              message: "enter valid email id!",
                            },
                          })}
                          autoComplete="off"
                        />
                        {errors["email"] && (
                          <p className="text-xs text-red-500 px-1 font-medium py-1">
                            {errors["email"]["message"]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-start w-full">
                        {watch("number") !== "" &&
                          watch("number") !== undefined && (
                            <p className="text-sm text-white px-1 font-medium py-1">
                              {"Mobile Number"}
                            </p>
                          )}
                        <input
                          type={"number"}
                          className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                          placeholder={"Mobile Number*"}
                          {...fieldRegister("number", {
                            required: {
                              value: true,
                              message: "mobile number is required!",
                            },
                            maxLength: {
                              value: 10,
                              message: "please enter a valid mobile number!",
                            },
                            minLength: {
                              value: 10,
                              message: "please enter a valid mobile number!",
                            },
                          })}
                          autoComplete="off"
                        />
                        {errors["number"] && (
                          <p className="text-xs text-red-500 px-1 font-medium py-1">
                            {errors["number"]["message"]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-start w-full">
                        {watch("password") !== "" &&
                          watch("password") !== undefined && (
                            <p className="text-sm text-white px-1 font-medium py-1">
                              {"Password"}
                            </p>
                          )}
                        <PasswordField
                          watch={watch}
                          register={fieldRegister}
                          name="password"
                          placeholder="Password*"
                        />
                        {errors["password"] && (
                          <p className="text-xs text-red-500 px-1 font-medium py-1">
                            {errors["password"]["message"]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-start w-full">
                        {watch("cnfPassword") !== "" &&
                          watch("cnfPassword") !== undefined && (
                            <p className="text-sm text-white px-1 font-medium py-1">
                              {"Confirm Password"}
                            </p>
                          )}
                        <PasswordField
                          watch={watch}
                          register={fieldRegister}
                          name="cnfPassword"
                          placeholder="Confirm Password*"
                        />
                        {errors["cnfPassword"] && (
                          <p className="text-xs text-red-500 px-1 font-medium py-1">
                            {errors["cnfPassword"]["message"]}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="w-full text-center pt-4">
                      <ReusableButton
                        bg="bg-primary"
                        title={"Create Account"}
                        text="text-white"
                        type="submit"
                      />
                    </div>
                    <p className="text-center text-white font-light text-sm py-2">
                      Already have an account ?{" "}
                      <span className="cursor-pointer text-primary font-medium">
                        {" "}
                        <Link href={"/login"}>Click here</Link>{" "}
                      </span>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <h4
                    className={`text-2xl lg:text-3xl font-bold text-white text-center py-2`}
                  >
                    Verification Email Sent
                  </h4>
                  <p
                    className="text-justify text-white font-light text-sm py-2"
                    style={{ textAlignLast: "center" }}
                  >
                    {
                      "A verification email with confirmation link has been sent your email id. Please click on the link to verify your email id to proceed further. The link is valid only for 1 hour."
                    }
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerRegister;
