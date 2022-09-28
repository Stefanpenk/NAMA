import { RecipeNavProps } from "../../types/types";

import { ReactComponent as Instruction } from "../../assets/instruction-icon.svg";
import { ReactComponent as Ingredients } from "../../assets/ingredients-icon.svg";
import { ReactComponent as Save } from "../../assets/save-icon.svg";
import { ReactComponent as Time } from "../../assets/time-icon.svg";
import { ReactComponent as Back } from "../../assets/back-icon.svg";

import { DetailsProps } from "../../types/types";

const RecipeNav = ({
  handleSave,
  handleGoBack,
  readyInMinutes,
  id,
  activeTab,
  setActiveTab,
}: RecipeNavProps) => {
  const storage: string = localStorage.getItem("token")!;
  const createData = JSON.parse(storage);
  const recipes: DetailsProps[] = createData.recipes;
  const haveId = recipes.find((recipe) => {
    return recipe.id === id;
  });
  const style =
    haveId === undefined
      ? {}
      : { backgroundColor: "red", borderColor: "red", cursor: "not-allowed" };
  let disable = haveId === undefined ? false : true;

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
      <button
        className="recipe-button"
        disabled={disable}
        style={style}
        onClick={handleSave}
      >
        <Save />
      </button>
      <button className="recipe-button" onClick={handleGoBack}>
        <Back />
      </button>
    </div>
  );
};

export default RecipeNav;
