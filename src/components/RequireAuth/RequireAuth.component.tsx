import { Navigate, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { childrenProps } from "../../types/types";

const RequireAuth = ({ children }: childrenProps) => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
