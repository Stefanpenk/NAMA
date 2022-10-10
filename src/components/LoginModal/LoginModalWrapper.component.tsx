import React from "react";
import LoginModal from "./LoginModal.component";

interface LoginModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
}

const LoginModalWrapper: React.FC<LoginModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  header,
  message,
}) => {
  if (!isModalVisible) {
    return null;
  }
  return (
    <LoginModal onBackdropClick={onBackdropClick}>
      <div className="desktop-login-modal-container">
        <div className="modal-close-button">
          <div className="moda-close-sign"></div>
        </div>
        <h3 className="modal-info">{header}</h3>
        {message && <p className="modal-message">{message}</p>}
      </div>
    </LoginModal>
  );
};

export default LoginModalWrapper;
