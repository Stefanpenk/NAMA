import useToken from "../../hooks/useToken";

import MealCard from "../../components/MealCard/MealCard";

import { useNavigate } from "react-router-dom";

import { DetailsProps } from "../../types/types";

import "./profile.styles.css";

const Profile = () => {
  const { removeToken, token } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <section className="section-profile nav-padding">
      <h3 className="profile-title">Welcome {token.name}</h3>
      <div className="profile-fav-container">
        <h5 className="profile-fav-title">Your favourite recipes:</h5>
        <div className="profile-fav-recipes meals-list">
          {token.recipes.map((recipe: DetailsProps) => {
            return <MealCard item={recipe} />;
          })}
        </div>
      </div>
      <button className="profile-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default Profile;
