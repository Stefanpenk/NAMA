import { Fragment, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/shop-logo.svg";

import useToken from "../../hooks/useToken";

import "./navigation.styles.css";

const Navigation = () => {
  const { token, removeToken } = useToken();

  const params = useParams();

  const handleLogout = () => {
    removeToken();
  };

  useEffect(() => {
    const style = document.documentElement.style;
    if (window.location.pathname === "/") {
      style.setProperty("--nav-bgc", "rgba(0, 0, 0, 0.2)");
      style.setProperty("--nav-link-color", "#fff");
    } else {
      style.setProperty("--nav-bgc", "rgba(255, 255, 255, 0.819)");
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
          <NavLink className="nav-link" to="/blog">
            <span>BLOG</span>
          </NavLink>
          <NavLink className="nav-link" to="/meals/breakfast">
            <span>MEALS</span>
          </NavLink>
          <NavLink className="nav-link" to="/cuisines/american">
            <span>CUISINES</span>
          </NavLink>
          <NavLink className="nav-link" to="/profile">
            <span>PROFILE</span>
          </NavLink>
          {token ? (
            <button className="nav-link align-self" onClick={handleLogout}>
              <span className="button-frame">SIGN OUT</span>
            </button>
          ) : (
            <NavLink className="nav-link align-self" to="/auth">
              <button className="button-frame">SIGN IN</button>
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
