import "./about.styles.css";

import Button from "../../components/Button/Button.component";

import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as Instagram } from "../../assets/instagram.svg";
import { ReactComponent as Email } from "../../assets/email.svg";

const About = () => {
  return (
    <section className="about-section nav-padding">
      <div className="about-img-container">
        <img src="./images/about-section(2).jpg" alt="" />
      </div>
      <div className="about-info-container">
        <h3 className="about-title">Our Mission</h3>
        <p className="about-text">
          Our aim is to make your journey towards living a Zero Waste Lifestyle
          less intimidating. For us, it's not about waste jars and ultimatums.
        </p>
        <p className="about-text">
          It's about making small changes every day that will leave a lasting
          impact.
        </p>
        <p className="about-text">
          It's about making sustainable living achievable, fun, and accessible!
        </p>
        <Button className="about" to="/learn" />
        <div className="about-contact-container">
          <h3 className="about-contact-title">Contact us:</h3>
          <p className="about-contact">
            <div className="about-icon-container">
              <Instagram />
            </div>
            Instagram
          </p>
          <p className="about-contact">
            <div className="about-icon-container white">
              <Facebook className="color" />
            </div>
            Facebook
          </p>
          <p className="about-contact">
            <div className="about-icon-container">
              <Email />
            </div>
            Email
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
