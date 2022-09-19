import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./cuisines.styles.css";

import { Responses } from "../meals/meals.component";
import { PopularRecipee } from "../meals/meals.component";

const Cuisines = () => {
  const [meals, setMeals] = useState<PopularRecipee[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [submit, setSubmit] = useState<boolean>(true);

  const number = 3;

  const params = useParams();

  return (
    <section className="section-meals">
      <div className="cuisine-cards">cuisine</div>
    </section>
  );
};
export default Cuisines;
