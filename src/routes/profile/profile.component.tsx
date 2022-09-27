import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import "./profile.styles.css";
import { FavRecipesContext } from "../../context/MyRecipes.context";
import { useContext } from "react";
import { link } from "fs";

const Profile = () => {
  const { removeToken, name, username } = useToken();
  const navigate = useNavigate();
  const { favRecipes } = useContext(FavRecipesContext);

  console.log(favRecipes);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <section className="section-profile nav-padding">
      <h2>Welcome {name}</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h5>Your favourite recipes</h5>
        <ul>
          {favRecipes.map((recipe: any) => {
            return <li key={recipe.id}>{recipe.title}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Profile;
