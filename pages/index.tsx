import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Home1 from "../components/homepages/Home1";
import Home2 from "../components/homepages/Home2";
import Home3 from "../components/homepages/Home3";
import { useMeLazyQuery, UserRole } from "../generated/graphql";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [randomHome, setRandomHome] = useState<number>();
  const [meQuery] = useMeLazyQuery();
  const router = useRouter();

  useEffect(() => {
    const myFunc = async () => {
      const { data, error, loading } = await meQuery();
      if (loading === false) {
        if (error !== undefined) {
          setRandomHome(Math.floor(Math.random() * 3) + 1);
          return null;
        }

        if (data === undefined) {
          setRandomHome(Math.floor(Math.random() * 3) + 1);
          return null;
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.isProfileCompleted) {
          router.replace("/dashboard?page=explore");
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
    myFunc();
    // eslint-disable-next-line
  }, [meQuery]);

  if (randomHome === 1) {
    return <Home1 />;
  } else if (randomHome === 2) {
    return <Home2 />;
  } else if (randomHome === 3) {
    return <Home3 />;
  } else {
    return null;
  }
};

export default Home;
