import { Link } from "react-router-dom";

import { PopularRecipee } from "../../routes/meals/meals.component";

import { ReactComponent as Vegeterian } from "../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../assets/vegan.svg";
import { ReactComponent as DairyFree } from "../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../assets/glutenfree.svg";

import "./MealCard.styles.css";

type CardProps = {
  item: PopularRecipee;
};

const MealCard = ({ item }: CardProps) => {
  const vegetarian = item.vegetarian === true ? { fill: "#A4B0A0" } : {};
  const vegan = item.vegan === true ? { fill: "#A4B0A0" } : {};
  const dairy = item.dairyFree === true ? { fill: "#A4B0A0" } : {};
  const gluten = item.glutenFree === true ? { fill: "#A4B0A0" } : {};

  return (
    <div key={item.id} className="meal-card">
      <Link to={"/recipe/" + item.id}>
        <h4 className="meal-title">{item.title}</h4>
        <p className="meal-time">preparation time: {item.readyInMinutes}min</p>
        <div className="image-container">
          <img
            src={item.image ? item.image : "/images/noImage.jpg"}
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
    </div>
  );
};

export default MealCard;
