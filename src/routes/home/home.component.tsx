import { useEffect, useState } from "react";
import { getData } from "../../utils/data.utils";

import CardList from "../../components/_Home/CardList/CardList.component";
import HeroSection from "../../components/_Home/HeroSection/hero-section.component";

import { DetailsProps, Response } from "../../types/types";

import "./home.styles.css";

const Home = () => {
  const [popular, setPopular] = useState<DetailsProps[]>([]);
  const [deserts, setDeserts] = useState<DetailsProps[]>([]);
  const [codePopular, setCodePopular] = useState(0);
  const [codeDesserts, setCodeDesserts] = useState(0);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await getData<Response>(
        `https://api.spoonacular.com/recipes/random?apiKey=f0039d77677947b8b23326fea1699dd4&number=9`
      );
      if (api.code && api.code >= 300) return setCodePopular(api.code);
      setCodePopular(0);
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
      if (api.code && api.code >= 300) return setCodeDesserts(api.code);
      setCodeDesserts(0);
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
        <CardList popular={popular} title="Popular Picks" code={codePopular} />
        <CardList
          popular={deserts}
          title="Something Sweet"
          code={codeDesserts}
        />
      </div>
    </div>
  );
};

export default Home;
