import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken";

import { ReactComponent as Vegeterian } from "../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../assets/vegan.svg";
import { ReactComponent as DairyFree } from "../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../assets/glutenfree.svg";
import { ReactComponent as DeleteButton } from "../../assets/delete-icon.svg";
import noRecipeImg from "../../assets/no-recipe-img.webp";
import { DeleteFromFavourite } from "../../utils/HandlingSaveDeleteFavourite/deleteFromFavourite.utils";

import { CardProps } from "../../types/types";
import "./MealCard.styles.css";

const MealCard = ({ item }: CardProps) => {
  const { token, saveToken } = useToken();
  const vegetarian = item.vegetarian === true ? { fill: "#A4B0A0" } : {};
  const vegan = item.vegan === true ? { fill: "#A4B0A0" } : {};
  const dairy = item.dairyFree === true ? { fill: "#A4B0A0" } : {};
  const gluten = item.glutenFree === true ? { fill: "#A4B0A0" } : {};

  const handleDeleteFromFavourite = () => {
    if (!token) return;
    DeleteFromFavourite({
      item: item,
      username: token.user,
      saveToken: saveToken,
    });
  };

  return (
    <div className="meal-card">
      <Link to={"/recipe/" + item.id}>
        <h4 className="meal-title">{item.title}</h4>
        <p className="meal-time">preparation time: {item.readyInMinutes}min</p>
        <div className="image-container">
          <img
            src={item.image ? item.image : `${noRecipeImg}`}
            alt={item.title}
          />
        </div>
        <div className="icons-container">
          <Vegeterian style={vegetarian} className="meal-icon" />
          <Vegan style={vegan} className="meal-icon" />
          <DairyFree style={dairy} className="meal-icon" />
          <GlutenFree style={gluten} className="meal-icon" />
        </div>
      </Link>
      {window.location.pathname === "/profile" ? (
        <button className="delete-fav" onClick={handleDeleteFromFavourite}>
          <DeleteButton />
        </button>
      ) : null}
    </div>
  );
};

export default MealCard;
