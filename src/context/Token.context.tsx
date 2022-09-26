import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext(null as any);

export const TokenProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => setToken(token);

  const logout = () => {
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
