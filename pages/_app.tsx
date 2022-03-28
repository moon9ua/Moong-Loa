import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Sidebar from "../components/layout/sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Sidebar />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
