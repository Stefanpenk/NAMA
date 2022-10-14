import { useEffect, useState } from "react";
import { getData } from "../../utils/data.utils";

import CardList from "../../components/Home/CardList/CardList.component";
import HeroSection from "../../components/Home/HeroSection/hero-section.component";

import { DetailsProps, Response } from "../../types/types";

import "./home.styles.css";

const Home = () => {
  const [popular, setPopular] = useState<DetailsProps[]>([]);
  const [deserts, setDeserts] = useState<DetailsProps[]>([]);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await getData<Response>(
        `https://api.spoonacular.com/recipes/random?apiKey=48d4912f994842029db529317a2efa6e&number=9`
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
        `https://api.spoonacular.com/recipes/random?apiKey=f0039d77677947b8b23326fea1699dd4&number=9&tags=dessert`
      );
      localStorage.setItem("deserts", JSON.stringify(api.recipes));
      setDeserts(api.recipes);
    }
  };

  useEffect(() => {
    getPopular();
    getDeserts();
  }, []);

  return (
    <div className="wrapper">
      <HeroSection />
      <div className="sections-container nav-padding">
        <CardList popular={popular} title="Popular Picks" />
        <CardList popular={deserts} title="Something Sweet" />
      </div>
    </div>
  );
};

export default Home;
