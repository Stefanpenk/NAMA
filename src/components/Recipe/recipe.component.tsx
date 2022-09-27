import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { FavRecipesContext } from "../../context/MyRecipes.context";

import { ReactComponent as Instruction } from "../../assets/instruction-icon.svg";
import { ReactComponent as Ingredients } from "../../assets/ingredients-icon.svg";
import { ReactComponent as Save } from "../../assets/save-icon.svg";
import { ReactComponent as Time } from "../../assets/time-icon.svg";
import { ReactComponent as Back } from "../../assets/back-icon.svg";

import "./recipe.styles.css";

type DetailsProps = {
  title: string;
  diets: string[];
  image: string;
  readyInMinutes: number;
  extendedIngredients: { id: number; original: string }[];
  analyzedInstructions: {
    name: string;
    steps: { number: number; step: string }[];
  }[];
  summary: string;
};

const Recipe = () => {
  const [activeTab, setActiveTab] = useState("instructions");
  const [details, setDetails] = useState<DetailsProps>({
    title: "",
    diets: [],
    image: "",
    readyInMinutes: 0,
    extendedIngredients: [{ id: 0, original: "" }],
    analyzedInstructions: [{ name: "", steps: [{ number: 0, step: "" }] }],
    summary: "",
  });
  const { username } = useToken();
  const { favRecipes, saveRecipes } = useContext(FavRecipesContext);

  const navigate = useNavigate();

  let params = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchDetails = async () => {
    const apiKey = "951fa37490bb4c928435c0d4c7950238";
    // 48d4912f994842029db529317a2efa6e

    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.search}/information?apiKey=${apiKey}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    // console.log(detailData);
  };

  const handleSave = () => {
    const newData = details;
    async function sendData(user: string, newData: DetailsProps) {
      return fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, newData: newData }),
      })
        .then((data) => data.json())
        .then((recipe) => saveRecipes(recipe));
    }
    sendData(username, newData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.search]);

  return (
    <section className="recipe-section">
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
                            instruction.name === "" ? "myid" : instruction.name
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
              <Save onClick={handleSave} />
            </button>
            <button className="recipe-button" onClick={handleGoBack}>
              <Back />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipe;
