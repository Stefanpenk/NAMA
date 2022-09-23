import { Fragment, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/shop-logo.svg";

import "./navigation.styles.css";

const Navigation = () => {
  const style = document.documentElement.style;

  const params = useParams();

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === "/") {
      style.setProperty("--nav-bgc", "rgba(0, 0, 0, 0.2)");
      style.setProperty("--nav-link-color", "#fff");
    } else {
      style.setProperty("--nav-bgc", "transparent");
      style.setProperty("--nav-link-color", "#111");
    }
  }, [params]);

  return (
    <Fragment>
      <div className="navigation">
        <NavLink className="logo-container home" to="">
          <Logo className="logo" />
        </NavLink>
        <div className="nav-left">
          <NavLink className="nav-link" to="/about">
            <span>ABOUT</span>
          </NavLink>
          <NavLink className="nav-link" to="/learn">
            <span>LEARN</span>
          </NavLink>
          <NavLink className="nav-link" to="/meals/breakfast">
            <span>MEALS</span>
          </NavLink>
          <NavLink className="nav-link" to="/cuisines/american">
            <span>CUISINES</span>
          </NavLink>
          <NavLink className="nav-link align-self" to="/auth">
            <button className="button-frame">SIGN IN</button>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
