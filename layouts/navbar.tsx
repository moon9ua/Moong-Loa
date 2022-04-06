import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  // console.log(process.env.BACKEND_URL, "hello");
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "world");

  return (
    <nav className={styles.nav}>
      {/* <input className={styles.input} placeholder="Search..." /> */}

      <Link href="/" as={process.env.BACKEND_URL + "/"}>
        <a>Home</a>
      </Link>

      <Link href="/calculator" as={process.env.BACKEND_URL + "/calculator"}>
        <a>제작 효율 계산기</a>
      </Link>

      <Link href="/homework" as={process.env.BACKEND_URL + "/homework"}>
        <a>숙제 검사표</a>
      </Link>
    </nav>
  );
}
