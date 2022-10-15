import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getDataSearchBar } from "../../../utils/changeKeyForSearchBar.utils";

import { SearchBarContext } from "../../../context/SearchBar.context";

import ChangeParamsButton from "../ChangeParamsButton/ChangeParamsButton.component";
import Checkbox from "../Checkbox/CheckBox.component";

import { ReactComponent as Vegeterian } from "../../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../../assets/vegan.svg";
import { ReactComponent as DairyFree } from "../../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../../assets/glutenfree.svg";

import { Responses, SearchBarProps } from "../../../types/types";
import "./searchBard.styles.css";

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
  const { cuisine } = useParams();
  const { type } = useParams();
  const { setMeals, setZeroTotalResults, setStatus } =
    useContext(SearchBarContext);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [submit, setSubmit] = useState<boolean>(true);

  useEffect(() => {
    const number = 3;
    const typeParam = type === undefined ? "" : type;
    const cuisineParam = cuisine === undefined ? "" : cuisine;

    const getMeals = async (
      type: string,
      cuisine: string,
      ingredients: string,
      diets: string,
      intolerances: string
    ) => {
      const api = await getDataSearchBar<Responses>(
        `https://api.spoonacular.com/recipes/complexSearch?number=${number}&addRecipeInformation=true&cuisine=${cuisine}&diet=${diets}&type=${type}&intolerances=${intolerances}&includeIngredients=${ingredients}`
      );
      console.log(api);
      if (api.results) setMeals(api.results);
      setZeroTotalResults(api.totalResults === 0);
      if (api.code && api.code >= 300) return setStatus(api.code);
      setStatus(0);
    };
    getMeals(
      typeParam,
      cuisineParam,
      ingredients.join(),
      diets.join(),
      intolerances.join()
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

  const handleDeleteProduct = (product: string) => {
    const value = product;

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
                onClick={() => handleDeleteProduct(product)}
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
