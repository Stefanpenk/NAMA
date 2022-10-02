import { ReactComponent as Star } from "../../assets/star-icon.svg";
import { ArticleInfoProps } from "../../types/types";

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const { author, date, authorImg, rating } = article;

  const getNumber = () => {
    if (rating.length === 0 || rating === undefined) {
      return 0;
    } else {
      const number = rating.reduce((a, b) => a + b.number, 0) / rating.length;
      return Math.round((number + Number.EPSILON) * 100) / 100;
    }
  };

  const createScore = () => {
    const score = getNumber();
    const lastScore = (score / 5) * 100;
    const styles = { transform: `translate(${lastScore}%)` };
    return styles;
  };

  return (
    <div className="article-info">
      <div
        className="article-author-img"
        style={{
          backgroundImage: `url(${authorImg})`,
        }}
      />
      <div className="article-info-text">
        <div className="article-author">{author}</div>
        <div className="article-date">{date}</div>
      </div>
      <div className="article-score-container">
        {getNumber() === 0 ? (
          "Nobody has rated this article yet."
        ) : (
          <>
            <p className="article-score-length">
              <span>{rating.length}</span> People rated this article.
            </p>
            <div className="article-score">
              <p className="article-score-number">{getNumber()}</p>
              <div className="article-score-stars">
                <div className="cover" style={createScore()}></div>
                <Star />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleInfo;
