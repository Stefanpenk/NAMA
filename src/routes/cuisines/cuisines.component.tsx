import { useContext } from "react";

import { SearchBarContext } from "../../context/SearchBar.context";

import Mealslist from "../../components/Meals&Cuisines/MealsList/Mealslist";
import SearchBar from "../../components/Meals&Cuisines/SearchBar/SearchBar.component";
import FoodLoader from "../../components/Loaders/FoodLoader";

import { ReactComponent as American } from "../../assets/american.svg";
import { ReactComponent as Italian } from "../../assets/italian.svg";
import { ReactComponent as Japanese } from "../../assets/japanese.svg";
import { ReactComponent as Thai } from "../../assets/thai.svg";

import "./cuisines.styles.css";

const Cuisines = () => {
  const { meals } = useContext(SearchBarContext);

  return (
    <section className="section-meals nav-padding">
      <SearchBar
        Button1={<American />}
        Button2={<Italian />}
        Button3={<Japanese />}
        Button4={<Thai />}
        title1="American"
        title2="Italian"
        title3="Japanese"
        title4="Thai"
        to1="/cuisines/american"
        to2="/cuisines/italian"
        to3="/cuisines/korean"
        to4="/cuisines/thai"
      />
      {meals.length === 0 ? <FoodLoader /> : <Mealslist meals={meals} />}
    </section>
  );
};
export default Cuisines;
