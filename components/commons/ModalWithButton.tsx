import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalWithButton.module.css";

interface ModalWithButtonProps {
  btnName: string;
  children: JSX.Element; // NOTE: 맞나?
}

export default function ModalWithButton({
  btnName,
  children,
}: ModalWithButtonProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>{btnName}</button>

      {modalOpen &&
        createPortal(
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
          document.getElementById("portal-modal")!
        )}
    </>
  );
}
