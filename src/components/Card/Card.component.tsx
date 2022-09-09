import { PopularRecipe } from "../../routes/home/home.component";
import { Link } from "react-router-dom";

import { ReactComponent as Vegeterian } from "../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../assets/vegan.svg";
import { ReactComponent as DiaryFree } from "../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../assets/glutenfree.svg";

import "./card.styles.css";

type CardProps = {
  recipe: PopularRecipe;
};

const Card = ({ recipe }: CardProps) => {
  const { title, image, vegeterian, vegan, dairyFree, glutenFree } = recipe;
  // console.log(recipe);
  return (
    <div className="card-container">
      <Link to={"/recipe/" + recipe.id}>
        <p className="card-container_p">{title}</p>
        <img className="card-container_img" src={image} alt={title} />
        <div className="symbolsContainer">
          {vegeterian && <Vegeterian className="isActive" />}
          {vegan && <Vegan className="isActive" />}
          {dairyFree && <DiaryFree className="isActive" />}
          {glutenFree && <GlutenFree className="isActive" />}
        </div>
        <div className="card-container-gradient"></div>
      </Link>
    </div>
  );
};

export default Card;
