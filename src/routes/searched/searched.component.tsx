import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Category from "../../components/Category/Category.component";

import CuisinesCard from "../../components/CuisinesCard/Cuisines-card.component";

import { PopularRecipe } from "../home/home.component";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState<PopularRecipe[]>([]);
  let params = useParams();

  const getSearched = async (name: string) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search ?? "");
  }, [params.search]);

  return (
    <section className="cuisine">
      <Category />
      <div className="cuisine-cards">
        {searchedRecipes.map((item) => {
          return <CuisinesCard item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}

export default Searched;
