import { Link } from "react-router-dom";

import "./hero-section.styles.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video
        src={process.env.PUBLIC_URL + "/videos/HeroSectionVideo.webm"}
        autoPlay
        loop
        muted
      />
      <div className="hero_text">
        <h1>DON'T THROW AWAY FOOD</h1>
        <h3>There is plenty recipes you can use them for</h3>
        <p>What are you waiting for?</p>
        <button className="button-solid">
          <Link to={"/about"}> LET'S START</Link>
        </button>
      </div>
    </div>
  );
};
export default HeroSection;
