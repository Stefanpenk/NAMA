import { useContext } from "react";

import { SearchBarContext } from "../../context/SearchBar.context";

import Mealslist from "../../components/_Meals&Cuisines/MealsList/Mealslist";
import SearchBar from "../../components/_Meals&Cuisines/SearchBar/SearchBar.component";
import FoodLoader from "../../components/Loaders/FoodLoader/FoodLoader";

import { ReactComponent as American } from "../../assets/american.svg";
import { ReactComponent as Italian } from "../../assets/italian.svg";
import { ReactComponent as Japanese } from "../../assets/japanese.svg";
import { ReactComponent as Thai } from "../../assets/thai.svg";

import "./cuisines.styles.css";
import NoResults from "../../components/Loaders/NoResults/NoResults";
import NoMoreSearch from "../../components/Loaders/NoMoreSearch/NoMoreSearch";
import OopsPage from "../../components/Loaders/OopsPage/OopsPage.component";

const Cuisines = () => {
  const { meals, zeroTotalResults, status } = useContext(SearchBarContext);

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
      {localStorage.getItem("tries") && <NoMoreSearch />}
      {status >= 400 && status !== 401 && status !== 402 && <OopsPage />}
      {zeroTotalResults && <NoResults />}
      {!localStorage.getItem("tries") &&
        !zeroTotalResults &&
        meals.length === 0 &&
        status <= 299 && <FoodLoader />}
      {!zeroTotalResults && meals.length !== 0 && <Mealslist meals={meals} />}
    </section>
  );
};
export default Cuisines;
