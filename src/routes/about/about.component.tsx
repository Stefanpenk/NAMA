import Button from "../../components/_About/Button/Button.component";

import { ReactComponent as Facebook } from "../../assets/linkedin.svg";
import { ReactComponent as Instagram } from "../../assets/instagram.svg";
import { ReactComponent as Email } from "../../assets/email.svg";
import aboutBgc from "../../assets/about-bgc.webp";

import "./about.styles.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-img-container">
        <img src={`${aboutBgc}`} alt="" />
      </div>
      <div className="about-info-container nav-padding">
        <div className="nama-meaning">
          <div className="nama-letter-container">
            <p className="nama-letter">N</p>
            <div className="nama-line"></div>
            <p className="nama-word">noll</p>
          </div>
          <div className="nama-letter-container">
            <p className="nama-letter">A</p>
            <div className="nama-line"></div>
            <p className="nama-word">avfall</p>
          </div>
          <div className="nama-letter-container">
            <p className="nama-letter">MA</p>
            <div className="nama-line"></div>
            <p className="nama-word">mat</p>
          </div>
        </div>
        <h3 className="about-title">My Mission</h3>
        <p className="about-text">
          My aim is to make your journey towards living a Zero Waste Lifestyle
          less intimidating. For me, it's not about waste jars and ultimatums.
        </p>
        <p className="about-text">
          It's about making small changes every day that will leave a lasting
          impact.
        </p>
        <p className="about-text">
          It's about making sustainable living achievable, fun, and accessible!
        </p>
        <Button className="about" to="/blog" />
        <div className="about-contact-container">
          <h3 className="about-contact-title">Contact me:</h3>
          <div className="about-contact">
            <a
              className="about-icon-container"
              href="https://www.instagram.com/_wildtaste/"
              target="_blank"
            >
              <Instagram />
            </a>
          </div>
          <div className="about-contact">
            <a
              className="about-icon-container"
              href="https://www.linkedin.com/in/stefan-penk-276a03245/"
              target="_blank"
            >
              <Facebook className="color" />
            </a>
          </div>
          <div className="about-contact">
            <a
              className="about-icon-container"
              href="mailto:stefan.penk@gmail.com"
            >
              <Email />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
