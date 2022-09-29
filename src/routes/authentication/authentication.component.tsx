import { useState } from "react";

import { ReactComponent as Logo } from "../../assets/shop-logo.svg";

import Login from "../../components/Login/login.component";
import Register from "../../components/Register/register.component";

import "./authentications.styles.css";

const Authentication = () => {
  const [register, setRegister] = useState(false);

  const handleSwitchForms = () => {
    setRegister(!register);
  };

  return (
    <section className="section-auth">
      <div className="auth-login-container nav-padding">
        <Logo className="auth-logo" />
        <h3 className="auth-title">
          {register ? "Create your account" : "Welcome Back"}
        </h3>
        {register ? (
          <Register handleSwitchForms={handleSwitchForms} />
        ) : (
          <Login />
        )}
        <div className="switch-container">
          <p className="switch-text">
            {register ? "Already registered?" : "Don't hava an account?"}
          </p>
          <button
            className="switch-button auth-button"
            onClick={handleSwitchForms}
          >
            {register ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
      <div
        className="auth-img-container"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/images/about-section(1).jpg')`,
        }}
      ></div>
    </section>
  );
};

export default Authentication;
