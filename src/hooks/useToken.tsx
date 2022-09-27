import { useState, useContext, createContext } from "react";

const TokenContext = createContext(null as any);

export const TokenProvider = ({ children }: any) => {
  const getToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      const tokenString: string = localStorage.getItem("token")!;
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    } else return null;
  };

  const getName = () => {
    const check = localStorage.getItem("token");
    if (check) {
      const tokenString: string = localStorage.getItem("token")!;
      const userToken = JSON.parse(tokenString);
      return userToken?.name;
    } else return null;
  };

  const getUsername = () => {
    const check = localStorage.getItem("token");
    if (check) {
      const tokenString: string = localStorage.getItem("token")!;
      const userToken = JSON.parse(tokenString);
      return userToken?.username;
    } else return null;
  };

  const [token, setToken] = useState<string | null>(getToken());
  const [name, setName] = useState<string | null>(getName());
  const [username, setUsername] = useState<string | null>(getUsername());

  const saveToken = (userToken: {
    token: string;
    name: string;
    username: string;
  }) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    setName(userToken.name);
    setUsername(userToken.username);
  };

  const removeToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <TokenContext.Provider
      value={{ token, saveToken, removeToken, name, username }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default function useToken() {
  return useContext(TokenContext);
}
