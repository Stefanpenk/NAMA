import { Navigate, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { childrenProps } from "../../types/types";

const RequireAdminAuth = ({ children }: childrenProps) => {
  const { token } = useToken();
  const location = useLocation();
  // Axel - great with protected routes


  if (!token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  if (token.token !== "admin") {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAdminAuth;
