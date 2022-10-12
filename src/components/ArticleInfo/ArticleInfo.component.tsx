import { ReactComponent as Stars } from "../../assets/stars-icon.svg";
import { ReactComponent as Star } from "../../assets/star-icon.svg";
import { ArticleInfoProps } from "../../types/types";
import useToken from "../../hooks/useToken";
import { useTokenTokenProps, fetchedBlogData } from "../../types/types";
import React, { useState, useContext } from "react";
import { getData } from "../../utils/data.utils";
import { BlogContext } from "../../context/Blog.context";
import LoginModalWrapper from "../LoginModal/LoginModalWrapper.component";

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const { blog, setBlog } = useContext(BlogContext);
  const [rate, setRate] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token }: useTokenTokenProps = useToken();
  const { author, date, authorImg, rating, id } = article;

  const searchUserInComments =
    token && rating.find((rate) => rate.user === token.user);

  const style = (ratingValue: number, rate: number, hover: number) =>
    ratingValue <= (rate || hover) ? { fill: "rgb(219, 186, 36)" } : {};

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

  const toggleLoginModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  async function sendScore(articleId: string, user: string, number: number) {
    return fetch("http://localhost:8080/sendrating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId,
        rating: { user: user, number: number },
      }),
    }).then((data) => data.json());
  }

  const handleSetRating = async (e: React.MouseEvent<HTMLInputElement>) => {
    const number = parseInt(e.currentTarget.value, 10);
    const articleId = id;
    const user = token.user;
    await sendScore(articleId, user, number);
    const api = await getData<fetchedBlogData>("http://localhost:8080/blog");
    setBlog(api.blog);
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
          <p className="isZero">Nobody has rated this article yet.</p>
        ) : (
          <>
            <div>
              <p className="article-score-length">
                <span>{rating.length}</span> People has rated this article.
              </p>
              <div className="article-score">
                <p className="article-score-number">{getNumber()}</p>
                <div className="article-score-stars">
                  <div className="cover" style={createScore()}></div>
                  <Stars />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="stars-container">
          {token == null
            ? [...Array(5)].map((star, index) => (
                <Star key={index} className="star" onClick={toggleLoginModal} />
              ))
            : searchUserInComments === undefined
            ? [...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="star-container">
                    <input
                      className="star-input"
                      type="radio"
                      name="raiting"
                      value={ratingValue}
                      onClick={handleSetRating}
                    />
                    <Star
                      className="star"
                      style={style(ratingValue, rate, hover)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })
            : "Your rate is already added."}
        </div>
      </div>
      <LoginModalWrapper
        isModalVisible={isModalVisible}
        onBackdropClick={toggleLoginModal}
        header="Login"
        message="Please login to add score."
      />
    </div>
  );
};

export default ArticleInfo;
