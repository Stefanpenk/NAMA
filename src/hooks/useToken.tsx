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

  const [token, setToken] = useState<string | null>(getToken());
  const [name, setName] = useState<string | null>(null);

  const saveToken = (userToken: { token: string; name: string }) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    setName(userToken.name);
  };

  const removeToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      localStorage.removeItem("token");
      setToken(null);
    }
    console.log(token);
    console.log(name);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken, name }}>
      {children}
    </TokenContext.Provider>
  );
};

export default function useToken() {
  return useContext(TokenContext);
}
