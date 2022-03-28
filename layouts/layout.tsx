import Head from "next/head";
import styles from "./layout.module.css";
import Navbar from "./navbar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title>Moong Loa</title>
      </Head>

      <Navbar />

      <main className={styles.main}>{children}</main>

      {/* <footer>임시 footer 입니다... ^^7</footer> */}
    </>
  );
}
