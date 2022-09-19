import MealCard from "../MealCard/MealCard";

import { PopularRecipee } from "../../routes/meals/meals.component";

import "./cardlist.styles.css";
import { useRef } from "react";

type CardListProps = {
  popular: PopularRecipee[];
  title: string;
};

const CardList = ({ popular, title }: CardListProps) => {
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
        <h3>{title}</h3>
        <p>
          <span onClick={handleScrollLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              preserveAspectRatio="none"
            >
              <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
            </svg>
          </span>
          <span onClick={handleScrollRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              preserveAspectRatio="none"
            >
              <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
            </svg>
          </span>
        </p>
      </div>
      <div className="card-list_container" ref={listRef}>
        {popular.map((item) => {
          return <MealCard item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default CardList;
