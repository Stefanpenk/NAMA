import { useContext } from "react";

import { SearchBarContext } from "../../context/SearchBar.context";

import Mealslist from "../../components/MealsList/Mealslist";
import SearchBar from "../../components/SearchBar/SearchBar.component";

import { ReactComponent as Breakfast } from "../../assets/breakfast.svg";
import { ReactComponent as Lunch } from "../../assets/lunch.svg";
import { ReactComponent as Dinner } from "../../assets/dinner.svg";
import { ReactComponent as Dessert } from "../../assets/dessert.svg";

import "./meals.styles.css";

const Meals = () => {
  const { meals } = useContext(SearchBarContext);

  return (
    <section className="section-meals nav-padding">
      <SearchBar
        Button1={<Breakfast />}
        Button2={<Lunch />}
        Button3={<Dinner />}
        Button4={<Dessert />}
        title1="Breakfast"
        title2="Lunch"
        title3="Dinner"
        title4="Dessert"
        to1="/meals/breakfast"
        to2="/meals/lunch"
        to3="/meals/dinner"
        to4="/meals/dessert"
      />
      {<Mealslist meals={meals} />}
    </section>
  );
};

export default Meals;
