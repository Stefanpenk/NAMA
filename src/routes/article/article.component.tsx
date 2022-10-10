import uniqid from "uniqid";
import { getData } from "../../utils/data.utils";
import { useParams } from "react-router-dom";
import useToken from "../../hooks/useToken";
import React, { useContext, useState, useEffect, useRef } from "react";
import { BlogContext } from "../../context/Blog.context";
import { BlogProps, fetchedBlogData } from "../../types/types";
import { ReactComponent as CommentProfile } from "../../assets/comment-profile-icon.svg";

import { getCurrentDate } from "../../utils/currentdate.utils";
import { BlogDefaultValue } from "../../context/Blog.context";
import { ReactComponent as DeleteButton } from "../../assets/delete-icon.svg";

import ArticleInfo from "../../components/ArticleInfo/ArticleInfo.component";

import "./article.styles.css";
import Button from "../../components/Button/Button.component";
import LoginModalWrapper from "../../components/LoginModal/LoginModalWrapper.component";

const Article = () => {
  const params = useParams();
  const { blog, setBlog } = useContext(BlogContext);
  const { token } = useToken();
  const [article, setArticle] = useState<BlogProps>(BlogDefaultValue);
  const [textareaValue, setTextareaValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getArticle = () => {
      const singleArticle = blog.find((obj) => obj.id === params.id);
      setArticle(
        singleArticle === undefined ? BlogDefaultValue : singleArticle
      );
    };
    getArticle();
  }, [blog]);

  const handleDeleteComment = async (id: string) => {
    const articleId = article.id === undefined ? "0" : article.id;
    async function deleteComment(articleId: string, id: string) {
      return fetch("http://localhost:8080/deletecomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: articleId,
          commentId: id,
        }),
      }).then((data) => data.json());
    }
    await deleteComment(articleId, id);
    const api = await getData<fetchedBlogData>("http://localhost:8080/blog");
    setBlog(api.blog);
  };

  const handleTextareaValue = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setTextareaValue(value);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function sendComment(
      id: string,
      user: string,
      articleId: string,
      comment: string,
      date: string
    ) {
      return fetch("http://localhost:8080/sendcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: articleId,
          comment: { id: id, user: user, date: date, text: comment },
        }),
      }).then((data) => data.json());
    }

    const id = uniqid();
    const user = token.username;
    const articleId = article.id === undefined ? "0" : article.id;
    const comment = textareaValue;
    const date = getCurrentDate("/");
    await sendComment(id, user, articleId, comment, date);
    const api = await getData<fetchedBlogData>("http://localhost:8080/blog");
    setBlog(api.blog);
    setTextareaValue("");
  };

  const toggleLoginModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <section className="section-article nav-padding">
      <div
        className="article-img"
        style={{
          backgroundImage: `url(${article.imgUrl})`,
        }}
      />
      <div className="article-wrapper">
        <ArticleInfo article={article} />
        <div className="article-title">{article.title}</div>
        <div className="article-text">{article.text}</div>
        <div className="article-comment-section">
          <div className="comment-counter">
            <span>{article.comments.length}</span> Comments
          </div>
          <div className="comments-wrapper">
            {article.comments.length === 0 ? (
              <p className="comment-single text-align-center">
                There are no comments yet.
              </p>
            ) : (
              article.comments.map((comment) => {
                return (
                  <div key={comment.id} className="comment-single">
                    {token && comment.user === token.username && (
                      <button
                        className="delete-fav"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <DeleteButton />
                      </button>
                    )}
                    <p className="comment-author">
                      <span className="comment-date">{comment.date}</span>
                      {comment.user}
                    </p>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                );
              })
            )}
          </div>
          <div className="comment-add-wrapper">
            <div className="comment-icon">
              <CommentProfile />
            </div>
            <form className="comment-form" onSubmit={handleSubmitComment}>
              <textarea
                className="comment-write-text"
                placeholder="write your comment"
                onChange={handleTextareaValue}
                value={!token ? "login to write a comment." : textareaValue}
                required
                disabled={!token && true}
              ></textarea>
              {token ? (
                <button className="comment-submit-button" type="submit">
                  Submit
                </button>
              ) : (
                <button
                  className="comment-submit-button comment-login"
                  onClick={toggleLoginModal}
                >
                  Login
                </button>
              )}
            </form>
            <LoginModalWrapper
              isModalVisible={isModalVisible}
              onBackdropClick={toggleLoginModal}
              header="Login"
              message="Please log in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
