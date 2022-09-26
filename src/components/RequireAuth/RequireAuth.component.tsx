import { Navigate, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";

const RequireAuth = ({ children }: any) => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
