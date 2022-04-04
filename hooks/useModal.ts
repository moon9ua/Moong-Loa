import { useState } from "react";

export default function useModal() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpened(true);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };

  return { isModalOpened, openModal, closeModal };
}
