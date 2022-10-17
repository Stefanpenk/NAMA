import { Fragment, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo-icon.svg";
import { ReactComponent as Login } from "../../assets/login-icon.svg";
import { ReactComponent as Logout } from "../../assets/logout-icon.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { ReactComponent as Admin } from "../../assets/admin-icon.svg";
import { ReactComponent as About } from "../../assets/about-icon.svg";
import { ReactComponent as Blog } from "../../assets/blog-icon.svg";
import { ReactComponent as Meal } from "../../assets/meal-icon.svg";
import { ReactComponent as Cusine } from "../../assets/cusine-icon.svg";

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
      style.setProperty("--nav-bgc", "rgba(0, 0, 0, 0.5)");
      style.setProperty("--nav-link-color", "#fff");
      style.setProperty("--nav-link-svg", "#fff");
    } else {
      style.setProperty("--nav-bgc", "rgba(255, 255, 255, 0.819)");
      style.setProperty("--nav-link-color", "#111");
      style.setProperty("--nav-link-svg", "hsl(105, 9%, 66%)");
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
            <About className="nav-swap-icon" />
          </NavLink>
          <NavLink className="nav-link" to="/blog">
            <span>BLOG</span>
            <Blog className="nav-swap-icon" />
          </NavLink>
        </div>
        <div className="nav-right">
          <NavLink className="nav-link" to="/meals/breakfast">
            <span>MEALS</span>
            <Meal className="nav-swap-icon" />
          </NavLink>
          <NavLink className="nav-link" to="/cuisines/american">
            <span>CUISINES</span>
            <Cusine className="nav-swap-icon" />
          </NavLink>
          <div className="nav-icons-container">
            {token && token.token === "admin" && (
              <NavLink className="nav-link different-position" to="/admin">
                <Admin />
              </NavLink>
            )}
            <NavLink className="different-position" to="/profile">
              <Profile />
            </NavLink>
            {token ? (
              <button className="different-position" onClick={handleLogout}>
                <Logout className="nav-link-icon " />
              </button>
            ) : (
              <NavLink className="different-position" to="/auth">
                <Login className="nav-link-icon" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
