import { Navigate, useLocation } from "react-router-dom";
// import { useToken } from "../../context/Token.context";
import { token } from "../../utils/token";

const RequireAuth = ({ children }: any) => {
  // const auth = useToken();
  const auth = token();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/auth" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
