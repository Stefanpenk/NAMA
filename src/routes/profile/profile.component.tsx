import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import "./profile.styles.css";

const Profile = () => {
  const { removeToken, name } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <section className="section-profile nav-padding">
      <h2>Welcome {name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Profile;