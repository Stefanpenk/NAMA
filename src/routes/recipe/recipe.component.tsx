import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import RecipeNav from "../../components/Recipe/RecipeNav/recipeNav.component";

import { DetailsProps } from "../../types/types";

import "./recipe.styles.css";
import FoodLoader from "../../components/Loaders/FoodLoader";

const Recipe = () => {
  let params = useParams();

  const [activeTab, setActiveTab] = useState("instructions");
  const [details, setDetails] = useState<DetailsProps | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const apiKey = "951fa37490bb4c928435c0d4c7950238";

      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.search}/information?apiKey=${apiKey}`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };
    fetchDetails();
  }, [params.search]);

  return (
    <section className="recipe-section">
      {details === null ? (
        <FoodLoader />
      ) : (
        <div className="recipe-wrapper">
          <h4 className="recipe-title">{details.title}</h4>
          <h5 className="recipe-subtitle">{details.diets.join(" | ")}</h5>
          <div className="recipe-rest">
            <div className="recipe-img-container">
              <img
                className="recipe-img"
                src={details.image ? details.image : "/images/noImage.jpg"}
                alt={details.title}
              />
            </div>
            {activeTab === "ingredients" && (
              <div className="recipe-detail">
                <h6 className="recipe-detail-title">Ingredients</h6>
                <ul className="recipe-ingredients">
                  {details.extendedIngredients.map((ingredient) => {
                    return (
                      <li className="recipe-ingredient" key={ingredient.id}>
                        {ingredient.original}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {activeTab === "instructions" && (
              <div className="recipe-detail">
                <h6 className="recipe-detail-title">Instruction</h6>
                <ul className="recipe-steps">
                  {details.analyzedInstructions.length === 0 ? (
                    <li
                      dangerouslySetInnerHTML={{ __html: details.summary }}
                    ></li>
                  ) : (
                    details.analyzedInstructions.map((instruction, index) => {
                      return (
                        <li key={index}>
                          <div
                            className="instructionName"
                            key={
                              instruction.name === ""
                                ? "myid"
                                : instruction.name
                            }
                          >
                            {instruction.name}
                          </div>
                          {instruction.steps.map((step) => {
                            return <div key={step.step}>{step.step}</div>;
                          })}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            )}
            <RecipeNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              details={details}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Recipe;
