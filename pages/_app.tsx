import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/layout";
import Navbar from "../layouts/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="portal-modal" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
