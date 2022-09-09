import "./hero-section.styles.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video src="/videos/Cooking-11323.mp4" autoPlay loop muted />
      <div className="hero_text">
        <h1>DON'T THROW AWAY YOUR PRODUCTS</h1>
        <h3>There is plenty recipes you can use them for</h3>
        <p>What are you waiting for?</p>
      </div>
    </div>
  );
};
export default HeroSection;
