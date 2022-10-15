import { useRef } from "react";

import MealCard from "../../MealCard/MealCard";
import OopsPage from "../../Loaders/OopsPage/OopsPage.component";
import NoMoreSearch from "../../Loaders/NoMoreSearch/NoMoreSearch";
import FoodLoader from "../../Loaders/FoodLoader/FoodLoader";

import { ReactComponent as ArrowLeft } from "../../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/arrow-right.svg";

import { CardListProps } from "../../../types/types";
import "./cardlist.styles.css";

const CardList = ({ popular, title, code }: CardListProps) => {
  const listRef = useRef<HTMLInputElement>(null);

  const handleScrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="card-list_section">
      <div className="card-list_header">
        <h3 className="card-list_title">{title}</h3>
        <p>
          <span onClick={handleScrollLeft}>
            <ArrowLeft />
          </span>
          <span onClick={handleScrollRight}>
            <ArrowRight />
          </span>
        </p>
      </div>
      <div className="card-list_container" ref={listRef}>
        {(code === 401 || code === 402) && <NoMoreSearch />}
        {code >= 400 && code !== 401 && code !== 402 && <OopsPage />}
        {code < 300 && popular.length === 0 && <FoodLoader />}
        {code < 300 &&
          popular.map((item) => {
            return <MealCard item={item} key={item.id} />;
          })}
      </div>
    </section>
  );
};

export default CardList;
