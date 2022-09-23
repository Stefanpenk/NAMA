import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { ReactComponent as Vegeterian } from "../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../assets/vegan.svg";
import { ReactComponent as DairyFree } from "../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../assets/glutenfree.svg";

import { getData } from "../../utils/data.utils";

import { Responses } from "../../routes/meals/meals.component";

import { SearchBarContext } from "../../context/SearchBar.context";

import ChangeParamsButton from "../ChangeParamsButton/ChangeParamsButton.component";
import Checkbox from "../Checkbox/CheckBox.component";

interface SearchBarProps {
  Button1: any;
  Button2: any;
  Button3: any;
  Button4: any;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  to1: string;
  to2: string;
  to3: string;
  to4: string;
}

function SearchBar({
  Button1,
  Button2,
  Button3,
  Button4,
  title1,
  title2,
  title3,
  title4,
  to1,
  to2,
  to3,
  to4,
}: SearchBarProps) {
  const { meals, setMeals } = useContext(SearchBarContext);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [submit, setSubmit] = useState<boolean>(true);

  let meal: string = "";
  let cuisine: string = "";

  const number = 3;
  const val = useParams();
  const params = () => {
    if (Object.keys(val)[0] === "meal") {
      meal = `${val.meal}`;
      cuisine = "";
    } else if (Object.keys(val)[0] === "cuisine") {
      meal = "";
      cuisine = `${val.cuisine}`;
    } else return;
  };

  const getMeals = async (
    type: string,
    ingredients: string,
    diets: string,
    intolerances: string,
    cuisine: string
  ) => {
    /*   const check = localStorage.getItem("breakfast");

    if (check) {
      setMeals(JSON.parse(check));
    } else {
      const api = await getData<Responses>(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&addRecipeInformation=true&cuisine=${cuisine}&diet=${diets}&type=${type}&intolerances=${intolerances}&includeIngredients=${ingredients}`
      );
      localStorage.setItem("breakfast", JSON.stringify(api.results));
      setMeals(api.results);
    } */

    const api = await getData<Responses>(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&addRecipeInformation=true&cuisine=${cuisine}&diet=${diets}&type=${type}&intolerances=${intolerances}&includeIngredients=${ingredients}`
    );
    setMeals(api.results);
  };

  useEffect(() => {
    params();
    getMeals(
      meal!,
      ingredients.join(),
      diets.join(),
      intolerances.join(),
      cuisine
    );
  }, [submit]);

  const handleSubmit = () => {
    setSubmit((prevState) => (prevState = !prevState));
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputValue;
    if (
      ingredients.indexOf(value) === -1 ||
      value === "" ||
      !(typeof value === "string")
    ) {
      setIngredients((curProducts) => [...curProducts, value]);
    }
    setInputValue("");
  };

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.getAttribute("name");
    const classList = e.currentTarget.classList;

    if (classList.contains("intolerances")) {
      e.currentTarget.checked === true
        ? setIntolerances((prevState) => [...prevState, value!])
        : setIntolerances((intolerances) =>
            intolerances.filter((intolerance) => {
              return intolerance !== value;
            })
          );
    } else if (classList.contains("diet")) {
      e.currentTarget.checked === true
        ? setDiets((prevState) => [...prevState, value!])
        : setDiets((diets) =>
            diets.filter((diet) => {
              return diet !== value;
            })
          );
    }
  };

  const handleDeleteProduct = (e: any) => {
    const value = e.target.previousSibling.textContent;

    setIngredients((ingredients) =>
      ingredients.filter((product) => {
        return product !== value;
      })
    );
  };

  return (
    <div className="searchBar">
      <div className="meals-types">
        <ChangeParamsButton
          handleSubmit={handleSubmit}
          svg={Button1}
          title={title1}
          to={to1}
        />
        <ChangeParamsButton
          handleSubmit={handleSubmit}
          svg={Button2}
          title={title2}
          to={to2}
        />
        <ChangeParamsButton
          handleSubmit={handleSubmit}
          svg={Button3}
          title={title3}
          to={to3}
        />
        <ChangeParamsButton
          handleSubmit={handleSubmit}
          svg={Button4}
          title={title4}
          to={to4}
        />
      </div>
      <div className="meals-form">
        <div className="input-container">
          <i className="fa fa-search icon"></i>
          <form action="" onSubmit={handleSubmitValue}>
            <input
              type="text"
              className="search-input"
              placeholder="Search by product"
              value={inputValue}
              onChange={handleInputValue}
            />
          </form>
        </div>
        <Checkbox
          name="vegan"
          svg={<Vegan />}
          className="diet"
          onChange={handleChangeInput}
        />
        <Checkbox
          name="vegetarian"
          svg={<Vegeterian />}
          className="diet"
          onChange={handleChangeInput}
        />
        <Checkbox
          name="Gluten"
          svg={<GlutenFree />}
          className="intolerances"
          onChange={handleChangeInput}
        />
        <Checkbox
          name="Dairy"
          svg={<DairyFree />}
          className="intolerances"
          onChange={handleChangeInput}
        />
        <button className="submit-form button-frame" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <ul className="selectedProducts">
        {ingredients.map((product) => {
          return (
            <li className="selectedProduct" key={product}>
              <p>{product}</p>
              <button
                className="selectedProduct-button"
                onClick={handleDeleteProduct}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchBar;