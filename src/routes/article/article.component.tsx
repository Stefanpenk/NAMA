import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../context/Blog.context";
import { BlogProps } from "../../types/types";
import { ReactComponent as Star } from "../../assets/star-icon.svg";

import "./article.styles.css";

const Article = () => {
  const params = useParams();
  const { blog } = useContext(BlogContext);
  const [article, setArticle] = useState<BlogProps>();

  useEffect(() => {
    const getArticle = () => {
      const singleArticle = blog.find((obj) => obj.id === params.id);
      setArticle(singleArticle);
    };
    getArticle();
  }, [blog]);

  const getNumber = () => {
    const rating = () => {
      if (article?.rating.length === 0 || article?.rating === undefined) {
        return [{ user: "string", number: 0 }];
      } else {
        return article?.rating;
      }
    };
    const array = rating();
    const number = array.reduce((a, b) => a + b.number, 0) / array.length;
    return Math.round((number + Number.EPSILON) * 100) / 100;
  };

  const createScore = () => {
    const score = getNumber();
    const lastScore = (score / 5) * 100;
    const styles = { transform: `translate(${lastScore}%)` };
    return styles;
  };

  return (
    <section className="section-article nav-padding">
      <div
        className="article-img"
        style={{
          backgroundImage: `url(${article?.imgUrl})`,
        }}
      ></div>
      <div className="article-wrapper">
        <div className="article-info">
          <div
            className="article-author-img"
            style={{
              backgroundImage: `url(${article?.authorImg})`,
            }}
          ></div>
          <div className="article-info-text">
            <div className="article-author">{article?.author}</div>
            <div className="article-date">{article?.date}</div>
          </div>
          <div className="article-score-container">
            <div className="article-score-length">
              <span>{article?.rating.length}</span> People rated this article.
            </div>
            <div className="article-score">{getNumber()}</div>
            <div className="article-score-stars">
              <div className="article-score-star">
                <div className="cover" style={createScore()}></div>
                <Star />
              </div>
            </div>
          </div>
        </div>
        <div className="article-title">{article?.title}</div>
        <div className="article-text">{article?.text}</div>
        <div className="article-comment-section">
          <div className="comment-counter">
            <span>5</span>Comments
          </div>
          <div className="comments-wrapper">
            <div className="comment-single">
              <div className="comment-author">Anonymous</div>
              <div className="comment-date">2022/09/30</div>
              <div className="comment-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellendus repellat ratione velit laboriosam voluptatem.
                Corrupti, molestiae. Esse reprehenderit, amet velit incidunt,
                labore sequi nemo blanditiis consectetur sit aspernatur corporis
                facilis!
              </div>
            </div>
            <div className="comment-add-wrapper">
              <div className="comment-icon"></div>
              <textarea
                className="comment-write-text"
                placeholder="write your comment"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
