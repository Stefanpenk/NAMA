import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

import MealCard from "../../components/MealCard/MealCard";
import ProfileImage from "../../components/_Profile/ProfileImage/ProfileImage.components";

import noRecipes from "../../assets/no-recipes.webp";

import { DetailsProps } from "../../types/types";
import "./profile.styles.css";

const Profile = () => {
  const { removeToken, token, saveToken } = useToken();
  const { name, user, recipes } = token!;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <section className="section-profile nav-padding">
      <div className="profile-background"></div>
      <div className="profile-container">
        <ProfileImage token={token!} saveToken={saveToken} />
        <h3 className="profile-title">{name}</h3>
        <h4 className="profile-subtitle">{user}</h4>
        <h5 className="profile-fav-title">Your favourite recipes:</h5>
        <div className="profile-fav-recipes meals-list">
          {recipes.length === 0 && (
            <>
              <div
                className="fav-recipes-no-recipes"
                style={{
                  backgroundImage: `url(${noRecipes})`,
                }}
              >
                <p>No favourite recipes, yet.</p>
              </div>
            </>
          )}
          {recipes.map((recipe: DetailsProps) => {
            return <MealCard key={recipe.id} item={recipe} />;
          })}
        </div>
        <button className="profile-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
