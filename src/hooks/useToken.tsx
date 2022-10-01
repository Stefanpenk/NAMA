import { useState, useContext, createContext } from "react";
import { TokenProps, Props } from "../types/types";

const TokenContext = createContext(null as any);

export const TokenProvider: React.FC<Props> = ({ children }) => {
  const getToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      const tokenString: string = localStorage.getItem("token")!;
      const userToken = JSON.parse(tokenString);
      return userToken;
    } else return null;
  };

  const [token, setToken] = useState<TokenProps | null>(getToken());

  const saveToken = (userToken: TokenProps | null) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default function useToken() {
  return useContext(TokenContext);
}
