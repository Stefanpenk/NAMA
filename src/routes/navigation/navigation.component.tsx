import { Fragment, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo-icon.svg";
import { ReactComponent as Login } from "../../assets/login-icon.svg";
import { ReactComponent as Logout } from "../../assets/logout-icon.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";

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
          </NavLink>
          <NavLink className="nav-link" to="/blog">
            <span>BLOG</span>
          </NavLink>
        </div>
        <div className="nav-right">
          <NavLink className="nav-link" to="/meals/breakfast">
            <span>MEALS</span>
          </NavLink>
          <NavLink className="nav-link" to="/cuisines/american">
            <span>CUISINES</span>
          </NavLink>
          <div className="nav-icons-container">
            <NavLink className="nav-link different-position" to="/profile">
              <Profile />
            </NavLink>
            {token ? (
              <button
                className="nav-link different-position"
                onClick={handleLogout}
              >
                <Logout className="nav-link-icon " />
              </button>
            ) : (
              <NavLink className="nav-link different-position" to="/auth">
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
