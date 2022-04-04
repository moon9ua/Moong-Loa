import { useState } from "react";
import Modal from "./Modal";

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

      {modalOpen && <Modal {...{ closeModal }}>{children}</Modal>}
    </>
  );
}
