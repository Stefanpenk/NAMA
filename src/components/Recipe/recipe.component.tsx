import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./recipe.styles.css";

import recipe from "./recipe.json";

import { ReactComponent as Instruction } from "../../assets/instruction-icon.svg";
import { ReactComponent as Ingredients } from "../../assets/ingredients-icon.svg";
import { ReactComponent as Save } from "../../assets/save-icon.svg";
import { ReactComponent as Time } from "../../assets/time-icon.svg";
import { ReactComponent as Back } from "../../assets/back-icon.svg";

type Recipe = {
  id: number;
  title: string;
};

type IngredientProps = {
  id: number;
  original: string;
};

type StepProps = {
  number: number;
  step: string;
};

type DetailsProps = {
  title: string;
  image: string;
  extendedIngredients: [];
  analyzedInstructions: [
    {
      steps: [step: string];
    }
  ];
};

const Recipe = () => {
  const [activeTab, setActiveTab] = useState("instructions");
  const [details, setDetails] = useState<{ [key: string]: any }>({});
  // const [ingredients, setIngredients] = useState<IngredientProps[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [steps, setSteps] = useState<StepProps[]>([]);

  // const ingredientsText: boolean|JSX.Element  = () => {
  //   return (
  //     activeTab === "ingredients" && (
  //       <div className="recipe-detail">
  //         <h6 className="recipe-detail-title">Ingredients</h6>
  //         <ul className="recipe-ingredients">
  //           {details.extendedIngredients.map((ingredient: IngredientProps) => {
  //             return (
  //               <li className="recipe-ingredient" key={ingredient.id}>
  //                 {ingredient.original}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //     )
  //   );
  // };

  // let params = useParams();

  // const fetchDetails = async () => {
  //   const check = localStorage.getItem("recipe");

  //   if (check) {
  //     setDetails(JSON.parse(check));
  //   } else {
  //     const data = await fetch(
  //       `https://api.spoonacular.com/recipes/${params.search}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  //     );
  //     const detailData = await data.json();
  //     setDetails(detailData);
  //     localStorage.setItem("recipe", JSON.stringify(detailData));
  //     setDetails(detailData);
  //   }

  //   /* const data = await fetch(
  //     `https://api.spoonacular.com/recipes/${params.search}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  //   );
  //   const detailData = await data.json();
  //   setDetails(detailData);
  //   // setIngredients(detailData.extendedIngredients);
  //   // setDiets(detailData.diets);
  //   console.log(detailData); */
  // };

  // useEffect(() => {
  //   // fetchDetails();
  // }, [params.search]);

  const fetchData = async () => {
    const data = recipe;
    setDetails(data);
    setDiets(data.diets);
    setSteps(data.analyzedInstructions[0].steps);
  };

  useEffect(() => {
    fetchData();
    // setDiets(details.diets);
  }, []);

  return (
    <section className="recipe-section">
      <div className="recipe-wrapper">
        <h4 className="recipe-title">{details.title}</h4>
        <h5 className="recipe-subtitle">{diets.join(" | ")}</h5>
        <div className="recipe-rest">
          <div className="recipe-img-container">
            <img
              className="recipe-img"
              src={details.image}
              alt={details.title}
            />
          </div>
          {/* {ingredientsText} */}
          {activeTab === "ingredients" && (
            <div className="recipe-detail">
              <h6 className="recipe-detail-title">Ingredients</h6>
              <ul className="recipe-ingredients">
                {details.extendedIngredients.map(
                  (ingredient: IngredientProps) => {
                    return (
                      <li className="recipe-ingredient" key={ingredient.id}>
                        {ingredient.original}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}
          {activeTab === "instructions" && (
            <div className="recipe-detail">
              <h6 className="recipe-detail-title">Instruction</h6>
              {/* <p dangerouslySetInnerHTML={{ __html: details.summary }}></p> */}
              {/* <p
                className="recipe-instruction"
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></p> */}
              <ul className="recipe-steps">
                {steps.map((step: StepProps) => {
                  return (
                    <li key={step.number} className="recipe-step">
                      {step.step}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="recipe-navigation">
            <button
              className={`recipe-button ${
                activeTab === "instructions" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("instructions");
              }}
            >
              <Instruction />
            </button>
            <button
              className={`recipe-button ${
                activeTab === "ingredients" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("ingredients");
              }}
            >
              <Ingredients />
            </button>
            <button className="recipe-button">
              <Time className="svg-time" />
              <div className="recipe-button-time">
                <p>{details.readyInMinutes}</p>
                <p className="recipe-button-min">min</p>
              </div>
            </button>
            <button className="recipe-button">
              <Save />
            </button>
            <button className="recipe-button">
              <Back />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipe;
