import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/layout";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="portal-modal" />
      <div id="portal-dropdown" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
