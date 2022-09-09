import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Category from "../../components/Category/Category.component";
import CuisinesCard from "../../components/CuisinesCard/Cuisines-card.component";
import { PopularRecipe } from "../home/home.component";

import "./cuisines.styles.css";

const Cuisines = () => {
  const [cuisine, setCuisine] = useState<PopularRecipe[]>([]);
  let params = useParams();

  const getCuisine = async (name: string) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type ?? "");
  }, [params.type]);

  return (
    <section className="cuisine">
      <Category />
      <div className="cuisine-cards">
        {cuisine.map((item) => {
          return <CuisinesCard item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};
export default Cuisines;
