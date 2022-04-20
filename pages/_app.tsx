import { useEffect } from "react"
import Head from "next/head";
import Script from "next/script"
import Aos from "aos"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "aos/dist/aos.css"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init({})
    document.addEventListener('scroll', (e) => { Aos.refresh() }, { capture: true, passive: true })
    return () => document.removeEventListener('scroll', (e) => { Aos.refresh() })
  }, [])

  return <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>InRadius</title>
      {/* <meta
        name="description"
        content="Inradius "
      /> */}
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
