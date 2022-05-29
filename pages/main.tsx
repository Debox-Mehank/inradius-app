import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useMeLazyQuery, UserRole } from "../generated/graphql";

const MainEntry = ({ children }: { children: ReactElement<any, any>[] }) => {
  const [meQuery, { loading }] = useMeLazyQuery();
  const router = useRouter();
  useEffect(() => {
    const myFunc = async () => {
      const { data, error, loading } = await meQuery();
      if (loading === false) {
        if (error !== undefined) {
          return null;
        }

        if (data === undefined) {
          return null;
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.isProfileCompleted) {
          router.replace("/dashboard");
        } else if (data.user.isSurveyCompleted) {
          if (data.user.type === UserRole.Employee) {
            router.replace("/employee-profile?page=location");
          } else if (data.user.type === UserRole.Employer) {
            router.replace("/employer-profile");
          }
        } else if (!data.user.isSurveyCompleted) {
          router.replace("/survey?type=" + data.user.type);
        } else {
          router.replace("/");
        }
      }
    };
    // myFunc();
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default MainEntry;
