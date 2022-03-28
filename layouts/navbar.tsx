import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {/* <input className={styles.input} placeholder="Search..." /> */}

      <Link href="/">
        <a>Home (로고?)</a>
      </Link>

      <Link href="/calculator">
        <a>제작 효율 계산기</a>
      </Link>

      <Link href="/todolist">
        <a>숙제 검사표</a>
      </Link>
    </nav>
  );
}
