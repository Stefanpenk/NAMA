import NoMoreSearchImg from "../../../assets/no-more-search.webp";

const NoMoreSearch = () => {
  return (
    <div className="oops-container">
      <div
        className="img-container"
        style={{
          backgroundImage: `url(${NoMoreSearchImg})`,
        }}
      />
      <p className="oops-img-author">
        <a href="https://pl.freepik.com/darmowe-wektory/ilustracja-koncepcji-testera-oprogramowania_32044575.htm#page=4&position=20&from_view=author">
          Image by storyset on Freepik.
        </a>
      </p>
      <h3 className="oops-header">
        SORRY,THE SEARCH ENGINE LIMIT IS OVER FOR TODAY...
      </h3>
      <p className="oops-text">
        Since this is just a portfolio project and searching is done with
        spoonacular free plan there are limits in searching.
      </p>
      <p className="oops-text">
        Probably too many people used this app today but you can still try
        another day.
      </p>
      <p className="oops-text">
        Remember to clean "Local Storage" before next search.
      </p>
    </div>
  );
};

export default NoMoreSearch;
