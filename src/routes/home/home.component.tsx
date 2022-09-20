import CardList from "../../components/CardList/CardList.component";

import { useEffect, useState } from "react";

import { getData } from "../../utils/data.utils";
import HeroSection from "../../components/HeroSection/hero-section.component";

import "./home.styles.css";

import { PopularRecipee } from "../meals/meals.component";

export type Response = {
  recipes: PopularRecipee[];
};

const Home = () => {
  const [popular, setPopular] = useState<PopularRecipee[]>([]);
  const [deserts, setDeserts] = useState<PopularRecipee[]>([]);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await getData<Response>(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      localStorage.setItem("popular", JSON.stringify(api.recipes));
      setPopular(api.recipes);
    }
  };

  const getDeserts = async () => {
    const check = localStorage.getItem("deserts");

    if (check) {
      setDeserts(JSON.parse(check));
    } else {
      const api = await getData<Response>(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=dessert`
      );
      localStorage.setItem("deserts", JSON.stringify(api.recipes));
      setDeserts(api.recipes);
    }
  };

  useEffect(() => {
    getPopular();
    getDeserts();
  }, []);
  // console.log(popular);

  return (
    <div className="wrapper">
      <HeroSection />
      <div className="sections-container">
        <CardList popular={popular} title="Popular Picks" />
        <CardList popular={deserts} title="Something Sweet" />
      </div>
    </div>
  );
};

export default Home;
