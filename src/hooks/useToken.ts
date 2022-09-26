import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString: string = sessionStorage.getItem("token")!;
    return tokenString;
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
