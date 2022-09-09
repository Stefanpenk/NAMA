import { NavLink } from "react-router-dom";

import Search from "../Search/search.component";

import { ReactComponent as American } from "../../assets/american.svg";
import { ReactComponent as Thai } from "../../assets/thai.svg";
import { ReactComponent as Japanese } from "../../assets/japanese.svg";
import { ReactComponent as Italian } from "../../assets/italian.svg";

import "./Category.styles.css";

const Category = () => {
  return (
    <section className="category">
      <Search />
      <h3>Popular Couisines</h3>
      <div className="category_container">
        <NavLink to={"/cuisine/italian"}>
          <Italian />
          <h4>Italian</h4>
        </NavLink>
        <NavLink to={"/cuisine/american"}>
          <American />
          <h4>American</h4>
        </NavLink>
        <NavLink to={"/cuisine/thai"}>
          <Thai />
          <h4>Thai</h4>
        </NavLink>
        <NavLink to={"/cuisine/chinese"}>
          <Japanese />
          <h4>Japanese</h4>
        </NavLink>
      </div>
    </section>
  );
};
export default Category;
