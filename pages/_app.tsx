import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div id="portal-modal" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
