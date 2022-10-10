import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { RecipeNavProps, TokenProps } from "../../types/types";

import { ReactComponent as Instruction } from "../../assets/instruction-icon.svg";
import { ReactComponent as Ingredients } from "../../assets/ingredients-icon.svg";
import { ReactComponent as Time } from "../../assets/time-icon.svg";
import { ReactComponent as Back } from "../../assets/back-icon.svg";

import SaveButton from "../SaveButton/SaveButton.component";
import UnsaveButton from "../UnsaveButton/UnsaveButton.components";

type useTokenProps = {
  token: TokenProps;
  saveToken: () => void;
};

const RecipeNav = ({ activeTab, setActiveTab, details }: RecipeNavProps) => {
  const navigate = useNavigate();
  const { token, saveToken }: useTokenProps = useToken();
  const { id, readyInMinutes } = details;
  const check = !token
    ? undefined
    : token.recipes.find((recipe) => recipe.id === id);
  // console.log(check);
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
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
          <p>{readyInMinutes}</p>
          <p className="recipe-button-min">min</p>
        </div>
      </button>
      {check === undefined ? (
        <SaveButton
          details={details}
          username={!token ? "no" : token.username}
          saveToken={saveToken}
        />
      ) : (
        <UnsaveButton
          details={details}
          username={token.username}
          saveToken={saveToken}
        />
      )}
      <button className="recipe-button" onClick={handleGoBack}>
        <Back />
      </button>
    </div>
  );
};

export default RecipeNav;
