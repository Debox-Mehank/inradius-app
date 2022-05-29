import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../features/common.slice";
import LogoWhite from "../components/reusables/LogoWhite";
import Link from "next/link";
import { useVerifyEmailLazyQuery } from "../generated/graphql";
// import { toast } from "react-toastify";

const EmailVerification = () => {
  const [verifyEmailQuery] = useVerifyEmailLazyQuery();

  const router = useRouter();
  const dispatch = useDispatch();
  const { userId, token } = router.query;

  const [success, setSuccess] = useState<boolean | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const myFunc = async () => {
      if (
        token !== "" &&
        token !== undefined &&
        userId !== "" &&
        userId !== undefined
      ) {
        dispatch(toggleLoading());
        const { data, error } = await verifyEmailQuery({
          variables: {
            input: { id: userId as string, token: token as string },
          },
        });
        dispatch(toggleLoading());

        if (error) {
          setSuccess(false);
          setError(error.message);
          return false;
        }

        setSuccess(true);
      }
    };
    myFunc();
  }, [userId, token]);

  return (
    <div className="h-full w-full grid place-items-center bg-darkGray relative">
      {/* Logo White */}
      <div className="z-40 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0">
        <div className="z-40 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28">
          <LogoWhite />
        </div>
      </div>
      {success === true ? (
        <div className="flex flex-col max-w-2xl px-4">
          <h4
            className={`text-2xl lg:text-4xl font-bold text-white text-center py-2`}
          >
            Email Verified!
          </h4>
          <p
            className="text-justify text-white font-light text-sm lg:text-lg py-2"
            style={{ textAlignLast: "center" }}
          >
            {
              "Thanks for verifying your email id. You may now login to your account to continue your journey, "
            }
            <span className="text-primary font-semibold">
              <Link href={"/login"}>click here </Link>
            </span>
            to login.
          </p>
        </div>
      ) : success === false ? (
        <div className="flex flex-col max-w-2xl px-4">
          <h4
            className={`text-2xl lg:text-4xl font-bold text-white text-center py-2`}
          >
            Verification Failed !
          </h4>
          {error === "Verification link expired!" ? (
            <>
              <p
                className="text-justify text-white font-light text-sm lg:text-lg py-2"
                style={{ textAlignLast: "center" }}
              >
                {
                  "Your verification link has expired, to continue request new verification link by "
                }
                <span className="text-primary font-semibold">
                  <Link href={"/login"}>clicking here.</Link>
                </span>
              </p>
            </>
          ) : (
            <p
              className="text-justify text-white font-light text-sm lg:text-lg py-2"
              style={{ textAlignLast: "center" }}
            >
              {error}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default EmailVerification;
