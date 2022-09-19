import MealCard from "../MealCard/MealCard";
import { PopularRecipee } from "../../routes/meals/meals.component";

import "./Mealslist.styles.css";

type MealListProps = {
  meals: PopularRecipee[];
};

const Mealslist = ({ meals }: MealListProps) => {
  return (
    <div className="meals-list">
      {meals.map((item) => {
        return <MealCard item={item} key={item.id} />;
      })}
    </div>
  );
};

export default Mealslist;
