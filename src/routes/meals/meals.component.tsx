import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import Mealslist from "../../components/MealsList/Mealslist";

import { ReactComponent as Vegeterian } from "../../assets/vegeterian.svg";
import { ReactComponent as Vegan } from "../../assets/vegan.svg";
import { ReactComponent as DairyFree } from "../../assets/diaryfree.svg";
import { ReactComponent as GlutenFree } from "../../assets/glutenfree.svg";

import { ReactComponent as Breakfast } from "../../assets/breakfast.svg";
import { ReactComponent as Lunch } from "../../assets/lunch.svg";
import { ReactComponent as Dinner } from "../../assets/dinner.svg";
import { ReactComponent as Dessert } from "../../assets/dessert.svg";

import { getData } from "../../utils/data.utils";

import "./meals.styles.css";
import SearchBar from "../../components/SearchBar/SearchBar.component";

import { SearchBarContext } from "../../context/SearchBar.context";

export type Responses = {
  results: PopularRecipee[];
};

export type PopularRecipee = {
  id: number;
  title: string;
  image: string;
  vegetarian: boolean;
  vegan: boolean;
  dairyFree: boolean;
  glutenFree: boolean;
  readyInMinutes: number;
};

const Meals = () => {
  const { meals, setMeals } = useContext(SearchBarContext);
  // const [meals, setMeals] = useState<PopularRecipee[]>([]);
  // const [inputValue, setInputValue] = useState("");
  // const [ingredients, setIngredients] = useState<string[]>([]);
  // const [intolerances, setIntolerances] = useState<string[]>([]);
  // const [diets, setDiets] = useState<string[]>([]);
  // const [submit, setSubmit] = useState<boolean>(true);

  const number = 15;

  const { meal } = useParams();

  // const getMeals = async (
  //   type: string,
  //   ingredients: string,
  //   diets: string,
  //   intolerances: string
  // ) => {
  //   const check = localStorage.getItem("breakfast");

  //   if (check) {
  //     setMeals(JSON.parse(check));
  //   } else {
  //     const api = await getData<Responses>(
  //       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&addRecipeInformation=true&cuisine=&diet=${diets}&type=${type}&intolerances=${intolerances}&includeIngredients=${ingredients}`
  //     );
  //     localStorage.setItem("breakfast", JSON.stringify(api.results));
  //     setMeals(api.results);
  //   }

  //   // const api = await getData<Responses>(
  //   //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&addRecipeInformation=true&cuisine=&diet=${diets}&type=${type}&intolerances=${intolerances}&includeIngredients=${ingredients}`
  //   // );
  //   // setMeals(api.results);
  // };

  // useEffect(() => {
  //   getMeals(meal!, ingredients.join(), diets.join(), intolerances.join());
  // }, [submit]);

  // const handleSubmit = () => {
  //   setSubmit((prevState) => (prevState = !prevState));
  // };

  /*   const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }; */

  /*   const handleSubmitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputValue;
    if (ingredients.indexOf(value) === -1) {
      setIngredients((curProducts) => [...curProducts, value]);
    }
    setInputValue("");
  }; */

  /*   const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.classList.contains("intolerances"));
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
  }; */

  /*   const handleDeleteProduct = (e: any) => {
    const value = e.target.previousSibling.textContent;

    setIngredients((ingredients) =>
      ingredients.filter((product) => {
        return product !== value;
      })
    );
  };
 */
  return (
    <section className="section-meals">
      {/* <div className="meals-types">
        <NavLink
          to={"/meals/breakfast"}
          className="meals-type"
          onClick={handleSubmit}
        >
          <Breakfast />
          <span>Breakfast</span>
        </NavLink>
        <NavLink
          to={"/meals/lunch"}
          className="meals-type"
          onClick={handleSubmit}
        >
          <Lunch />
          <span>Lunch</span>
        </NavLink>
        <NavLink
          to={"/meals/dinner"}
          className="meals-type"
          onClick={handleSubmit}
        >
          <Dinner />
          <span>Dinner</span>
        </NavLink>
        <NavLink
          to={"/meals/dessert"}
          className="meals-type"
          onClick={handleSubmit}
        >
          <Dessert />
          <span>Dessert</span>
        </NavLink>
      </div> */}
      {/* <div className="meals-form">
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
        <label htmlFor="vegan" className="label-icons">
          <Vegan />
        </label>
        <input
          type="checkbox"
          name="vegan"
          id="vegan"
          className="input-icons diet"
          onChange={handleChangeInput}
        />
        <label htmlFor="vegeterian" className="label-icons">
          <Vegeterian />
        </label>
        <input
          type="checkbox"
          name="vegetarian"
          id="vegetarian"
          className="input-icons diet"
          onChange={handleChangeInput}
        />
        <label htmlFor="glutenFree" className="label-icons">
          <GlutenFree />
        </label>
        <input
          type="checkbox"
          name="Gluten"
          id="glutenFree"
          className="input-icons intolerances"
          onChange={handleChangeInput}
        />
        <label htmlFor="dairyFree" className="label-icons">
          <DairyFree />
        </label>
        <input
          type="checkbox"
          name="Dairy"
          id="dairyFree"
          className="input-icons intolerances"
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
      </ul> */}
      <SearchBar />
      {<Mealslist meals={meals} />}
    </section>
  );
};

export default Meals;
