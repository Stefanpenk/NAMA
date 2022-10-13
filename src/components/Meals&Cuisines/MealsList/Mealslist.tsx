import MealCard from "../../MealCard/MealCard";

import { MealListProps } from "../../../types/types";

import "./Mealslist.styles.css";

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
