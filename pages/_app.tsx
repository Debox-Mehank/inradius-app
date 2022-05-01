import { useEffect } from "react"
import Head from "next/head";
import Script from "next/script"
import Aos from "aos"
import { Provider } from "react-redux"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "aos/dist/aos.css"
import 'react-circular-progressbar/dist/styles.css';
import 'react-input-range/lib/css/index.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from "../app/store";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init({})
    document.addEventListener('scroll', (e) => { Aos.refresh() }, { capture: true, passive: true })
    return () => document.removeEventListener('scroll', (e) => { Aos.refresh() })
  }, [])

  return <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>InRadius</title>
    </Head>
    <Script id="gtm-script" strategy='lazyOnload' src='https://www.googletagmanager.com/gtag/js?id=G-RXXJZJCD69' />
    <Script id="gtm" strategy='lazyOnload'>
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RXXJZJCD69');
        `}
    </Script>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
