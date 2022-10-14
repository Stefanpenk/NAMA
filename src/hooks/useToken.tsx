import { useState, useContext, createContext } from "react";
import {
  TokenProps,
  TokenProps2,
  Props,
  TokenContextProps,
} from "../types/types";

const getToken = () => {
  const check = localStorage.getItem("token");
  if (check) {
    const tokenString: string = localStorage.getItem("token")!;
    const userToken = JSON.parse(tokenString);
    return userToken;
  } else return null;
};

const TokenContext = createContext<TokenContextProps>({
  token: null,
  saveToken: (userToken) => {},
  removeToken: () => {},
});

export const TokenProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<TokenProps | null>(getToken());

  const saveToken = (userToken: TokenProps2 | null) => {
    localStorage.setItem("token", JSON.stringify(userToken!.res));
    setToken(userToken!.res);
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
