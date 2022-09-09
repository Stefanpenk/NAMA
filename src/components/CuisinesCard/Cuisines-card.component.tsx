import { PopularRecipe } from "../../routes/home/home.component";
import { Link } from "react-router-dom";

import "./Cuisines-card.styles.css";

type CardProps = {
  item: PopularRecipe;
};

const CuisinesCard = ({ item }: CardProps) => {
  const { title, image, id } = item;

  return (
    <div className="card" key={id}>
      <Link to={"/recipe/" + id}>
        <img src={image} alt={title} />
        <h4>{title}</h4>
      </Link>
    </div>
  );
};
export default CuisinesCard;
