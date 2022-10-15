import { useContext } from "react";

import { SearchBarContext } from "../../context/SearchBar.context";

import Mealslist from "../../components/_Meals&Cuisines/MealsList/Mealslist";
import SearchBar from "../../components/_Meals&Cuisines/SearchBar/SearchBar.component";
import FoodLoader from "../../components/Loaders/FoodLoader/FoodLoader";

import { ReactComponent as Breakfast } from "../../assets/breakfast.svg";
import { ReactComponent as Lunch } from "../../assets/lunch.svg";
import { ReactComponent as Dinner } from "../../assets/dinner.svg";
import { ReactComponent as Dessert } from "../../assets/dessert.svg";

import "./meals.styles.css";
import NoResults from "../../components/Loaders/NoResults/NoResults";
import NoMoreSearch from "../../components/Loaders/NoMoreSearch/NoMoreSearch";
import OopsPage from "../../components/Loaders/OopsPage/OopsPage.component";

const Meals = () => {
  const { meals, zeroTotalResults, status } = useContext(SearchBarContext);
  /*   console.log(meals);
  console.log(zeroTotalResults);
  console.log(status); */
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
      {status >= 500 && <OopsPage />}
      {localStorage.getItem("tries") && <NoMoreSearch />}
      {zeroTotalResults && <NoResults />}
      {!localStorage.getItem("tries") &&
        !zeroTotalResults &&
        meals.length === 0 &&
        status <= 299 && <FoodLoader />}
      {!zeroTotalResults && meals.length !== 0 && <Mealslist meals={meals} />}
    </section>
  );
};

export default Meals;
