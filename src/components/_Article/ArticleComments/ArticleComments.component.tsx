import { useContext } from "react";
import { getData } from "../../../utils/data.utils";
import useToken from "../../../hooks/useToken";

import { BlogContext } from "../../../context/Blog.context";

import { ReactComponent as DeleteSvg } from "../../../assets/delete-icon.svg";
import noProfilePicture from "../../../assets/no-image-profile.webp";

import { CommentProps, fetchedBlogData } from "../../../types/types";
import "./ArticleComments.styles.css";

const ArticleComments = ({ article }: CommentProps) => {
  const { token } = useToken();
  const { setBlog } = useContext(BlogContext);

  const handleDeleteComment = async (id: string) => {
    if (article.id === undefined) return;
    const articleId = article.id;
    async function deleteComment(articleId: string, id: string) {
      return fetch("https://namaserver.onrender.com/deletecomment", {
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
    const api = await getData<fetchedBlogData>(
      "https://namaserver.onrender.com/blog"
    );
    setBlog(api.blog);
  };

  return (
    <div className="comments-wrapper">
      {article.comments.length === 0 && (
        <p className="comment-single text-align-center">
          There are no comments yet.
        </p>
      )}
      {article.comments.map((comment) => {
        const { user, id, text, date, profileImg } = comment;
        return (
          <div key={comment.id} className="comment-single">
            {token && user === token.user && (
              <button
                className="delete-fav"
                onClick={() => handleDeleteComment(id)}
              >
                <DeleteSvg />
              </button>
            )}
            <div className="comment-author">
              <div
                className="comment-profile-img"
                style={{
                  backgroundImage: `url(${
                    profileImg === "" ? noProfilePicture : profileImg
                  })`,
                }}
              />
              <div className="comment-profile-info">
                <p className="comment-user">{user}</p>
                <h6 className="comment-date">{date}</h6>
              </div>
            </div>
            <div className="comment-text">{text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleComments;
