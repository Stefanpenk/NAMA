import { useState, useEffect } from "react";

import Button from "../../components/Button/Button.component";

import { ReactComponent as Up } from "../../assets/up-arrow-icon.svg";
import { ReactComponent as Down } from "../../assets/down-arrow-icon.svg";

import learn from "../../assets/learn.json";

import "./learn.styles.css";

type tipsProps = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
};

function Learn() {
  const [tips, setTips] = useState<tipsProps[]>([
    { id: 0, title: "", description: "", imgUrl: "" },
  ]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const getTips = () => {
      setTips([...learn]);
    };
    getTips();
  }, []);

  const handleChangeSlideMinus = () => {
    number !== 0 && setNumber((prevState) => prevState - 1);
  };

  const handleChangeSlidePlus = () => {
    number === tips.length - 1
      ? setNumber(0)
      : setNumber((prevState) => prevState + 1);
  };

  return (
    <section className="learn-section nav-padding">
      <p className="learn-description">
        We are lucky to be able to choose what we eat, because many people
        around the world don’t have that same choice. Canadian households toss
        out about $1,300 worth of food a year, while Americans waste about
        $2,000 worth annually. If we add restaurants, grocery stores, farms,
        etc. we are wasting – $31 billion in Canada and $165 billion in the U.S.
      </p>
      <p className="learn-description">
        Fortunately, there are many things we can do at home to reduce food
        waste, and there are tons of zero-waste recipes you can easily make in
        your kitchen with basic tools.
      </p>
      <h5 className="learn-title">
        HOW TO REDUCE FOOD WASTE + BEST ZERO-WASTE RECIPES
      </h5>
      <ul className="learn-tips-container">
        <li className="learn-tip-container">
          <div className="learn-tip-imgcontainer">
            <img
              className="learn-tip-img"
              src={tips[number].imgUrl}
              alt={tips[number].title}
            />
          </div>
          <div className="learn-tip-info">
            <h5 className="learn-tip-title">{tips[number].title}</h5>
            <p className="learn-tip-text">{tips[number].description}</p>
          </div>
          <div className="learn-nav-container">
            <Up className="learn-nav-arrows" onClick={handleChangeSlideMinus} />
            <div className="learn-nav-number">0{tips[number].id}</div>
            <Down
              className="learn-nav-arrows"
              onClick={handleChangeSlidePlus}
            />
            <Button to="/meals/breakfast" />
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Learn;
