import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Menu.module.css";

interface MenuProps {
  btnName?: string;
  children: any;

  isIcon?: boolean;
}

export default function Menu({ btnName, children, isIcon }: MenuProps) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const onScroll = () => {
    setIsMenuOpened(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

  if (typeof window === "undefined") return <></>;
  const el = document.getElementById("portal-dropdown");
  if (!el) return <></>;

  return (
    <div className={styles.dropdown}>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setX(e.clientX);
          setY(e.clientY);
          setIsMenuOpened((prev) => !prev);
        }}
        onBlur={() => {
          setIsMenuOpened(false);
        }}
      >
        {isIcon ? <FontAwesomeIcon icon={faEllipsisVertical} /> : btnName}
      </button>

      {isMenuOpened &&
        createPortal(
          <ul
            className={styles["dropdown-content"]}
            style={{ top: y, left: x }}
          >
            {children}
          </ul>,
          el
        )}
    </div>
  );
}
