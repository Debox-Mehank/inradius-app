import Head from "next/head";
import Router from "next/router";
import Script from "next/script";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toggleLoading } from "../features/common.slice";
import { setDashboardUser } from "../features/dashboard.sice";
import { useMeLazyQuery, User } from "../generated/graphql";
import client from "../utils/apollo_client";

const MainComponent = ({
  children,
  pageProps,
}: {
  children: ReactElement;
  pageProps: any;
}) => {
  const dispatch = useDispatch();
  const [meQuery] = useMeLazyQuery();

  const loading = useSelector((state: RootState) => state.common.loading);

  useEffect(() => {
    const myFunc = async () => {
      try {
        client.resetStore();
        dispatch(toggleLoading());
        const { data } = await meQuery();
        dispatch(toggleLoading());

        console.log(data);

        // not logged in
        if (pageProps && pageProps.protected && !data) {
          Router.replace("/login");
          return;
        }

        if (data?.user && data.user.isProfileCompleted) {
          const user: User = {
            _id: data.user._id,
            email: data.user.email,
            firstName: data.user.firstName,
            isAccountVerified: data.user.isAccountVerified,
            isProfileCompleted: data.user.isProfileCompleted,
            isSurveyCompleted: data.user.isSurveyCompleted,
            lastName: data.user.lastName,
            number: data.user.number,
            type: data.user.type,
            createdAt: undefined,
            updatedAt: undefined,
          };
          dispatch(setDashboardUser(user));
        }
      } catch (error) {
        Router.replace("/login");
        return;
      }
    };
    myFunc();
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>InRadius</title>
      </Head>
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-RXXJZJCD69"
      />
      <Script id="gtm" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RXXJZJCD69');
        `}
      </Script>
      {loading ? null : children}
    </>
  );
};

export default MainComponent;
