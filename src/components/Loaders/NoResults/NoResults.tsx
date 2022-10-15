import NoResult from "../../../assets/no-results.webp";

const NoResults = () => {
  return (
    <div className="oops-container">
      <div
        className="img-container"
        style={{
          backgroundImage: `url(${NoResult})`,
        }}
      />
      <p className="oops-img-author">
        <a href="https://pl.freepik.com/darmowe-wektory/ilustracja-koncepcji-testera-oprogramowania_32044575.htm#page=4&position=20&from_view=author">
          Image by storyset on Freepik.
        </a>
      </p>
      <h3 className="oops-header">WE COULDN'T FIND ANY RESULTS...</h3>
      <p className="oops-text">We will try to make it better next time.</p>
      <p className="oops-text">Please try to find another option.</p>
    </div>
  );
};

export default NoResults;
