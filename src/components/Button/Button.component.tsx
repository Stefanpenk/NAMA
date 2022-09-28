import { Link } from "react-router-dom";

import { ReactComponent as Next } from "../../assets/next-text.svg";
import { ReactComponent as MealsText } from "../../assets/meals-text.svg";
import { ReactComponent as Learn } from "../../assets/learn-text.svg";

import "./Button.styles.css";

const Button = ({ className = "", to = "" }) => {
  const textSvg = () => {
    `${className}` === "" ? (
      <MealsText className="button-next-text" />
    ) : (
      <Learn className="button-next-text" />
    );
  };
  textSvg();
  return (
    <div className={`button-next ${className}`}>
      <Link to={to}>
        <Next className="button-next-svg" />
        {`${className}` === "" ? (
          <MealsText className="button-next-text" />
        ) : (
          <Learn className="button-next-text" />
        )}
      </Link>
    </div>
  );
};

export default Button;
