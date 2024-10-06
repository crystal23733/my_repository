import React, { ReactNode } from "react";

/**
 * 통합 모달 컴포넌트
 *
 * 다양한 상황에 따라 모달을 구성할 수 있는 컴포넌트입니다.
 * `title`과 `children`을 통해 모달의 제목과 내용을 동적으로 구성할 수 있습니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isActive - 모달의 활성화 상태를 나타냅니다. true면 모달이 활성화됩니다.
 * @param {function} props.closeModal - 모달을 닫는 함수입니다.
 * @param {string} props.title - 모달의 제목입니다.
 * @param {ReactNode} props.children - 모달의 내용을 구성하는 자식 요소입니다.
 *
 * @returns {React.FC} 통합 모달 컴포넌트
 */
const Modal: React.FC<{
  isActive: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  loadingStatus: boolean;
}> = ({ isActive, closeModal, title, children, onConfirm, loadingStatus }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button
              className="button is-success"
              onClick={onConfirm}
              disabled={loadingStatus}
            >
              확인
            </button>
            <button className="button" type="reset" onClick={closeModal}>
              취소
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
