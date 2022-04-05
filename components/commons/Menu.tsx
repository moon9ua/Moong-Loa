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

  return (
    <div className={styles.dropdown}>
      <button
        onClick={() => {
          setIsMenuOpened((prev) => !prev);
        }}
        onBlur={() => {
          setIsMenuOpened(false);
        }}
      >
        {isIcon ? <FontAwesomeIcon icon={faEllipsisVertical} /> : btnName}
      </button>

      {isMenuOpened && (
        <ul className={styles["dropdown-content"]}>{children}</ul>
      )}
    </div>
  );
}
