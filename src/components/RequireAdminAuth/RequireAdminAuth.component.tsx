import { Navigate, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";

const RequireAdminAuth = ({ children }: any) => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  if (token.token !== "admin") {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAdminAuth;
