import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "../../../hooks/useToken";

type LocationProps = {
  state: {
    from: Location;
  };
};

const Login = () => {
  const { saveToken } = useToken();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const redirectPath = location.state?.from?.pathname || "/";

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
      navigate(redirectPath, { replace: true });
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
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          id="loginInput"
          type="email"
          placeholder="e-mail"
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
  );
};

export default Login;
