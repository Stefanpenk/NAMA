import { useState } from "react";

type RegisterProps = {
  handleSwitchForms: () => void;
};

const Register = ({ handleSwitchForms }: RegisterProps) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async function createUser(user: string, password: string, name: string) {
    return fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, password: password, name: name }),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("different passwords");
    } else {
      const create = await createUser(user, password, name);
      const value = Object.values(create).join();
      const key = Object.keys(create).join();
      key === "error" ? setError(value) : setError(value);
      setTimeout(() => {
        handleSwitchForms();
      }, 3000);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    switch (id) {
      case "createLoginInput":
        setUser(value.toLocaleLowerCase());
        break;
      case "createNameInput":
        setName(capitalizeFirstLetter(value));
        break;
      case "createPasswordInput":
        setPassword(value);
        break;
      case "repeatPasswordInput":
        setConfirmPassword(value);
        break;
      default:
        console.log(`don't know ${id}`);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          id="createLoginInput"
          type="email"
          placeholder="e-mail"
          required
          onChange={handleInput}
        />
        <input
          id="createNameInput"
          type="text"
          placeholder="name"
          required
          onChange={handleInput}
        />
        <input
          id="createPasswordInput"
          type="password"
          placeholder="password"
          required
          onChange={handleInput}
        />
        <input
          id="repeatPasswordInput"
          type="password"
          placeholder="password"
          required
          onChange={handleInput}
        />
        <button className="auth-button" type="submit">
          Submit
        </button>
      </form>
      <div className="auth-error">{error}</div>
    </>
  );
};

export default Register;
