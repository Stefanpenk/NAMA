import { Link } from "react-router-dom";

import { ReactComponent as Next } from "../../../assets/next-text.svg";
import { ReactComponent as Learn } from "../../../assets/learn-text.svg";

import "./Button.styles.css";

const Button = ({ className = "", to = "" }) => {
  return (
    <div className={`button-next ${className}`}>
      <Link to={to}>
        <Next className="button-next-svg" />
        <Learn className="button-next-text" />
      </Link>
    </div>
  );
};

export default Button;
