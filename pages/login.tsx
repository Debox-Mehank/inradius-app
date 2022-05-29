import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { toggleLoading } from "../features/common.slice";
import ReusableButton from "../components/reusables/ReusableButton";
import PasswordField from "../components/reusables/PasswordField";
import Logo from "../components/reusables/Logo";
import LogoWhite from "../components/reusables/LogoWhite";
import login_static from "../assets/login_static.png";
import {
  useLoginLazyQuery,
  useMeLazyQuery,
  UserRole,
} from "../generated/graphql";
import { useRouter } from "next/router";

export interface UserLoginFormFields {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const [loginQuery] = useLoginLazyQuery();
  const [meQuery] = useMeLazyQuery();
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserLoginFormFields>();

  const dispatch = useDispatch();

  const submitHandler = async (data: UserLoginFormFields) => {
    dispatch(toggleLoading());
    const { data: loginQueryData, error } = await loginQuery({
      variables: {
        input: { email: data.email, password: data.password },
      },
    });
    dispatch(toggleLoading());

    if (error) {
      toast.error(error.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return false;
    }

    // Fetch User
    dispatch(toggleLoading());
    const { data: meQueryData, error: mQueryError } = await meQuery();
    dispatch(toggleLoading());

    console.log(meQueryData, mQueryError);

    localStorage.setItem("user", JSON.stringify(meQueryData?.user));

    if (meQueryData?.user.isProfileCompleted) {
      router.replace("/dashboard");
    } else if (meQueryData?.user.isSurveyCompleted) {
      if (meQueryData.user.type === UserRole.Employee) {
        router.replace("/employee-profile?page=location");
      } else if (meQueryData.user.type === UserRole.Employer) {
        router.replace("/employer-profile");
      }
    } else if (!meQueryData?.user.isSurveyCompleted) {
      router.replace("/survey?type=" + meQueryData?.user.type);
    } else {
      router.replace("/");
    }
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

        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="w-full h-full bg-white hidden lg:flex flex-col">
            <div
              className="w-full flex items-end pt-16 px-16"
              style={{ height: "45%" }}
            >
              <h2 className="whitespace-pre-line text-2xl lg:text-3xl xl:text-4xl font-bold tracking-widest leading-relaxed mb-16">
                {"Continue to get a job "}{" "}
                <span className="text-primary">closer</span> {" to your home!"}
              </h2>
            </div>
            <div
              className="w-full flex items-center justify-center p-12"
              style={{ height: "55%" }}
            >
              <div className="h-full w-full relative">
                <Image
                  alt=""
                  src={login_static}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/*Main Form */}
          <div className="w-full h-full bg-darkGray flex flex-col justify-center items-center tracking-wide">
            <div className="max-w-md w-4/5">
              {/* Login Form */}
              <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
                <h4
                  className={`text-2xl lg:text-3xl font-bold text-white text-center py-2`}
                >
                  Login
                </h4>
                <br />
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col justify-start w-full">
                    {watch("email") !== "" && watch("email") !== undefined && (
                      <p className="text-sm text-white px-1 font-medium py-1">
                        {"Email"}
                      </p>
                    )}
                    <input
                      type={"email"}
                      className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                      placeholder={"Email*"}
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
                      showDesc={false}
                    />
                    {errors["password"] && (
                      <p className="text-xs text-red-500 px-1 font-medium py-1">
                        {errors["password"]["message"]}
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <div className="w-full text-center pt-4">
                  <ReusableButton
                    bg="bg-primary"
                    title={"Access Account"}
                    text="text-white"
                    type="submit"
                  />
                </div>
                <p className="text-center text-white font-light text-sm py-2">
                  {"Don't have an account ?"}{" "}
                  <span className="cursor-pointer text-primary font-medium">
                    {" "}
                    <Link href={"/employee-register"}>Click here</Link>{" "}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
