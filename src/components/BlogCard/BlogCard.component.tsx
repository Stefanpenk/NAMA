import { Link } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../context/Blog.context";

import "./BlogCard.styles.css";

const BlogCard = () => {
  const { blog } = useContext(BlogContext);
  console.log(blog);
  return (
    <div className="blog-articles-container">
      {blog.map((article) => {
        return (
          <Link
            key={article.id}
            className="blog-article"
            to={"/article/" + article.id}
          >
            <div
              className="article-mini-img"
              style={{
                backgroundImage: `url(${article.imgUrl})`,
              }}
            ></div>
            <div className="article-mini-info">
              <div className="article-mini-title">{article.title}</div>
              <p className="article-mini-text">{article.text}</p>
            </div>
            <div className="article-mini-footer">
              <div className="article-mini-date">{article.date}</div>
              <div className="article-mini-author">
                <div
                  className="article-mini-author-img"
                  style={{
                    backgroundImage: `url(${article.authorImg})`,
                  }}
                ></div>
                <span>{article.author}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogCard;
