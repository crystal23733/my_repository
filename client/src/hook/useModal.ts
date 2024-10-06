import { useState } from "react";

export default () => {
  const [isActive, setIsActive] = useState<boolean>(false); // * 모달창의 상태를 관리

  const handleMypageModal = () => {
    setIsActive(true);
  };

  const closeModal = () => {
    setIsActive(false);
  };

  return { isActive, handleMypageModal, closeModal };
};

