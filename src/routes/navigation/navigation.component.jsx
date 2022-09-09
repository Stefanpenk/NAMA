import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/shop-logo.svg";

import "./navigation.styles.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <div className="navigation_left-side">
          <Link className="logo-container" to="">
            <div>
              <Logo className="logo" />
            </div>
          </Link>
          <h2 className="navigation_title">ZERO-WASTE KITCHEN</h2>
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/popularrecipes">
            POPULAR RECIPES
          </Link>
          <Link className="nav-link" to="/searched/all">
            SEARCH BY PRODUCT
          </Link>
          <Link className="nav-link" to="/cuisine/all">
            CUISINES
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
