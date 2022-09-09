import { getValue } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./recipe.styles.css";

type Recipe = {
  id: number;
  title: string;
};

type IngredientProps = {
  id: number;
  original: string;
};

function Recipe() {
  const [details, setDetails] = useState<{ [key: string]: any }>({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [ingredients, setIngredients] = useState<IngredientProps[]>([]);
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    setIngredients(detailData.extendedIngredients);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <div className="recipe-wrapper">
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <div className="info">
        <button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => {
            setActiveTab("instructions");
          }}
        >
          Instructions
        </button>
        <button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => {
            setActiveTab("ingredients");
          }}
        >
          Ingredients
        </button>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p>{details.instructions}</p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {ingredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Recipe;
