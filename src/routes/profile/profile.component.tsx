// import { useToken } from "../../context/Token.context";
import { token } from "../../utils/token";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import "./profile.styles.css";

const Profile = () => {
  const auth = token();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <section className="section-profile nav-padding">
      <h2>Welcome Stefan {auth}</h2>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Profile;
