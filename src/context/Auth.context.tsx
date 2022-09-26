import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null as any);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (user: string) => setUser(user);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
