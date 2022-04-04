import { useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: JSX.Element; // NOTE: 맞나?
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  if (typeof window === "undefined") return <></>;

  const el = document.getElementById("portal-modal");
  // NOTE: useMemo를 사용할 수 없을까? (사용하는게 효율적인거 아닌가?)

  if (!el) return <></>;

  return createPortal(
    <div className={styles.background} onClick={closeModal}>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    el
  );
}
