import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import Script from "next/script";
import Aos from "aos";
import { Provider } from "react-redux";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import "react-input-range/lib/css/index.css";
import "../styles/globals.css";
import { store } from "../app/store";
import client from "../utils/apollo_client";
import Loader from "../components/reusables/Loader";
import MainEntry from "./main";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init({});
    document.addEventListener(
      "scroll",
      (e) => {
        Aos.refresh();
      },
      { capture: true, passive: true }
    );
    return () =>
      document.removeEventListener("scroll", (e) => {
        Aos.refresh();
      });
  }, []);

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
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MainEntry>
            <Loader />
            <ToastContainer />
            <Component {...pageProps} />
          </MainEntry>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
