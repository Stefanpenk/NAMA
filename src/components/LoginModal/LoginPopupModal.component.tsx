import { useState } from "react";
import { ReactComponent as CloseButton } from "../../assets/delete-icon.svg";
import useToken from "../../hooks/useToken";

import "./LoginPopupModal.styles.css";

type LoginPopupModalProps = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

const LoginPopupModal = ({
  setIsModalVisible,
  message,
}: LoginPopupModalProps) => {
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
      setIsModalVisible(false);
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

  return (
    <div onClick={() => setIsModalVisible(false)} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-container">
          <div
            className="modal-close-button"
            onClick={() => setIsModalVisible(false)}
          >
            <CloseButton className="modal-close-sign" />
          </div>
          <h3 className="modal-info">Login</h3>
          <p className="modal-message">{message}</p>
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
                type="password"
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
      </div>
    </div>
  );
};

export default LoginPopupModal;
