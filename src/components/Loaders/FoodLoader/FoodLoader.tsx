import FoodLoaderImg from "../../../assets/meals-loader.gif";

import "./foodLoader.styles.css";

const FoodLoader = () => {
  return (
    <div className="food-loader-container">
      <img
        src={FoodLoaderImg}
        alt="Food loading"
        className="food-loader-image"
      />
      <p className="food-loader-text">Loading data...</p>
    </div>
  );
};

export default FoodLoader;
