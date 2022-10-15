import OopsImg from "../../../assets/oops-page.webp";

import "./OopsPage.styles.css";

const OopsPage = () => {
  return (
    <div className="oops-container">
      <div
        className="img-container"
        style={{
          backgroundImage: `url(${OopsImg})`,
        }}
      />
      <p className="oops-img-author">
        <a href="https://pl.freepik.com/darmowe-wektory/ilustracja-koncepcji-testera-oprogramowania_32044575.htm#page=4&position=20&from_view=author">
          Image by storyset on Freepik.
        </a>
      </p>
      <h3 className="oops-header">OOPS! SOMETHING WENT WRONG...</h3>
      <p className="oops-text">
        You may also refresh the page or try again later.
      </p>
      <p className="oops-text">Brace yourself till we get the error fixed.</p>
    </div>
  );
};

export default OopsPage;
