import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./authentications.styles.css";
import { useToken } from "../../context/Token.context";

const Authentication = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location: any = useLocation();
  const setToken = useToken();
  const redirectPath = location.state?.path || "/";

  const setTokenToStorage = (userToken: string) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  async function loginUser(credentials: { user: string; password: string }) {
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser({
      user,
      password,
    });
    setTokenToStorage(token.token);
    setToken.login(token.token);
    navigate(redirectPath, { replace: true });
    console.log(token.token);
  };

  const handleLoginInput = (e: React.FormEvent<HTMLInputElement>) => {
    setUser(e.currentTarget.value);
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <section className="section-auth nav-padding">
      <form onSubmit={handleSubmit}>
        <label htmlFor="loginInput">Username:</label>
        <input
          id="loginInput"
          type="text"
          placeholder="login"
          onChange={handleLoginInput}
        />
        <label htmlFor="loginInput">Password:</label>
        <input
          id="passwordInput"
          type="text"
          placeholder="password"
          onChange={handlePasswordInput}
        />
        <button type="submit">Submit</button>
      </form>

      <label htmlFor="loginInput">Username:</label>
      <input
        id="loginInput"
        type="text"
        placeholder="login"
        onChange={handleLoginInput}
      />
    </section>
  );
};

export default Authentication;
