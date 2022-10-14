import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { BlogContext } from "../../context/Blog.context";
import { BlogDefaultValue } from "../../context/Blog.context";

import ArticleInfo from "../../components/Article/ArticleInfo/ArticleInfo.component";
import FoodLoader from "../../components/Loaders/FoodLoader";
import AddComment from "../../components/Article/AddComment/AddComment.component";
import ArticleComments from "../../components/Article/ArticleComments/ArticleComments.component";
import OopsPage from "../../components/OopsPage/OopsPage.component";

import { ArticleObj, BlogProps } from "../../types/types";
import "./article.styles.css";

const Article = () => {
  const params = useParams();
  const { archive, blog } = useContext(BlogContext);
  const [article, setArticle] = useState<BlogProps>(BlogDefaultValue);
  const { title, text, comments, imgUrl } = article || ({} as ArticleObj);

  useEffect(() => {
    const getArticle = () => {
      const archiveArticle = archive.find((obj) => obj.id === params.id);
      const singleArticle = blog.find((obj) => obj.id === params.id);
      if (archiveArticle !== undefined) return setArticle(archiveArticle);
      if (archiveArticle === undefined)
        return setArticle(
          singleArticle === undefined ? BlogDefaultValue : singleArticle
        );
    };
    getArticle();
  }, [blog]);

  return (
    <section className="section-article nav-padding">
      {!archive && <OopsPage />}
      {!blog && <OopsPage />}
      {blog[0].id === "" && <FoodLoader />}
      {archive[0].id === "" && <FoodLoader />}
      <div
        className="article-img"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      />
      <div className="article-wrapper">
        {<ArticleInfo article={article} />}
        <div className="article-title">{title}</div>
        <p className="article-text">{text}</p>
        <div className="article-comment-section">
          <p className="comment-counter">
            <span>{comments.length}</span> Comment
            {comments.length !== 1 && "s"}.
          </p>
          <ArticleComments article={article} />
          <AddComment article={article} />
        </div>
      </div>
    </section>
  );
};

export default Article;
