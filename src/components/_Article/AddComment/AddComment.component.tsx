import { useState, useContext } from "react";
import useToken from "../../../hooks/useToken";
import uniqid from "uniqid";
import { getCurrentDate } from "../../../utils/currentdate.utils";
import { getData } from "../../../utils/data.utils";

import { BlogContext } from "../../../context/Blog.context";

import LoginPopupModal from "../../LoginModal/LoginPopupModal.component";

import { ReactComponent as CommentProfile } from "../../../assets/comment-profile-icon.svg";

import { CommentProps, fetchedBlogData } from "../../../types/types";
import "./addComment.styles.css";

const AddComment = ({ article }: CommentProps) => {
  const { token } = useToken();
  const { setBlog } = useContext(BlogContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    async function sendComment(
      id: string,
      user: string,
      articleId: string,
      comment: string,
      date: string,
      profileImg: string
    ) {
      return fetch("https://api.stefanpenk.comsendcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: articleId,
          comment: {
            id: id,
            user: user,
            date: date,
            text: comment,
            profileImg: profileImg,
          },
        }),
      }).then((data) => data.json());
    }

    const id = uniqid();
    const user = token.user;
    const articleId = article.id === undefined ? "0" : article.id;
    const comment = textareaValue;
    const date = getCurrentDate("/");
    const profileImg = token.profileImg;

    await sendComment(id, user, articleId, comment, date, profileImg);
    const api = await getData<fetchedBlogData>(
      "https://api.stefanpenk.comblog"
    );
    setBlog(api.blog);
    setTextareaValue("");
  };

  const handleTextareaValue = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setTextareaValue(value);
  };

  return (
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
            onClick={() => setIsModalVisible(true)}
          >
            Login
          </button>
        )}
      </form>
      {isModalVisible && (
        <LoginPopupModal
          setIsModalVisible={setIsModalVisible}
          message="Please login to post a comment."
        />
      )}
    </div>
  );
};

export default AddComment;
