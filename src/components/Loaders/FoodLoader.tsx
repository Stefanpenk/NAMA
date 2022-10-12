import FoodLoaderImg from "../../assets/meals-loader.gif";
import "./foodLoader.styles.css";

const FoodLoader = () => {
  return (
    <div className="food-loader-container">
      <img
        src={FoodLoaderImg}
        alt="Food loading"
        className="food-loader-image"
      />
    </div>
  );
};

export default FoodLoader;
