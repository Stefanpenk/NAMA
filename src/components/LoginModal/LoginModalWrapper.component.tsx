import React, { useState } from "react";
import LoginModal from "./LoginModal.component";
import { ReactComponent as CloseButton } from "../../assets/delete-icon.svg";
import useToken from "../../hooks/useToken";

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
  const { saveToken } = useToken();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function loginUser(user: string, password: string) {
      return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, password: password }),
      }).then((data) => data.json());
    }

    const token = await loginUser(user, password);
    if (Object.keys(token).find((key) => key === "error")) {
      const value = Object.values(token).join();
      setError(value);
    } else {
      saveToken(token);
      setUser("");
      setPassword("");
      onBackdropClick();
    }
  };

  const handleLoginInput = (e: React.FormEvent<HTMLInputElement>) => {
    setError("");
    setUser(e.currentTarget.value);
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.currentTarget.value);
  };

  if (!isModalVisible) {
    return null;
  }

  return (
    <LoginModal onBackdropClick={onBackdropClick}>
      <div className="login-modal-container">
        <div className="modal-close-button" onClick={onBackdropClick}>
          <CloseButton className="modal-close-sign" />
        </div>
        <h3 className="modal-info">{header}</h3>
        {message && <p className="modal-message">{message}</p>}
        <>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              id="loginInput"
              type="text"
              placeholder="username"
              required
              onChange={handleLoginInput}
            />
            <input
              id="passwordInput"
              type="text"
              placeholder="password"
              required
              onChange={handlePasswordInput}
            />
            <button className="auth-button" type="submit">
              Submit
            </button>
          </form>
          <div className="auth-error">{error}</div>
        </>
      </div>
    </LoginModal>
  );
};

export default LoginModalWrapper;
