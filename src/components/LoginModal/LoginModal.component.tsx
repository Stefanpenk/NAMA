import React from "react";
import ReactDOM from "react-dom";

import "./LoginModal.styles.css";

interface ModalProps {
  onBackdropClick: () => void;
  children?: React.ReactNode;
}

const LoginModal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <div onClick={onBackdropClick} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default LoginModal;
