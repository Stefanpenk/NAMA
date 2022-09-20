import { Fragment, useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/shop-logo.svg";

import "./navigation.styles.css";

const Navigation = () => {
  const handleChangeNavColor = (e: React.MouseEvent<HTMLElement>) => {
    const style = document.documentElement.style;
    const home = e.currentTarget.classList;
    if (home.contains("home")) {
      style.setProperty("--nav-bgc", "rgba(0, 0, 0, 0.2)");
      style.setProperty("--nav-link-color", "#fff");
    } else {
      style.setProperty("--nav-bgc", "transparent");
      style.setProperty("--nav-link-color", "#111");
    }
  };

  return (
    <Fragment>
      <div className="navigation">
        <NavLink
          className="logo-container home"
          to=""
          onClick={handleChangeNavColor}
        >
          <Logo className="logo" />
        </NavLink>
        <div className="nav-left">
          <NavLink
            className="nav-link"
            to="/about"
            onClick={handleChangeNavColor}
          >
            <span>ABOUT</span>
          </NavLink>
          <NavLink
            className="nav-link"
            to="/learn"
            onClick={handleChangeNavColor}
          >
            <span>LEARN</span>
          </NavLink>
          <NavLink
            className="nav-link"
            to="/meals/breakfast"
            onClick={handleChangeNavColor}
          >
            <span>MEALS</span>
          </NavLink>
          <NavLink
            className="nav-link"
            to="/cuisines/american"
            onClick={handleChangeNavColor}
          >
            <span>CUISINES</span>
          </NavLink>
          <NavLink
            className="nav-link"
            to="/recipe/all"
            onClick={handleChangeNavColor}
          >
            <span>PRODUCTS</span>
          </NavLink>
          <NavLink
            className="nav-link align-self"
            to="/auth"
            onClick={handleChangeNavColor}
          >
            <button className="button-frame">SIGN IN</button>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
