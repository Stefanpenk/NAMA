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

  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    console.log(token);
  };

  const removeToken = () => {
    const check = localStorage.getItem("token");
    if (check) {
      localStorage.removeItem("token");
      setToken(null);
    }
    console.log(token);
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
