import Button from "../../components/_About/Button/Button.component";

import { ReactComponent as Facebook } from "../../assets/facebook.svg";
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
            <p className="nama-letter">n</p>
            <div className="nama-line"></div>
            <p className="nama-word">noll</p>
          </div>
          <div className="nama-letter-container">
            <p className="nama-letter">a</p>
            <div className="nama-line"></div>
            <p className="nama-word">avfall</p>
          </div>
          <div className="nama-letter-container">
            <p className="nama-letter">ma</p>
            <div className="nama-line"></div>
            <p className="nama-word">mat</p>
          </div>
        </div>
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
        <Button className="about" to="/blog" />
        <div className="about-contact-container">
          <h3 className="about-contact-title">Contact us:</h3>
          <div className="about-contact">
            <div className="about-icon-container">
              <Instagram />
            </div>
            Instagram
          </div>
          <div className="about-contact">
            <div className="about-icon-container white">
              <Facebook className="color" />
            </div>
            Facebook
          </div>
          <div className="about-contact">
            <div className="about-icon-container">
              <Email />
            </div>
            Email
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
