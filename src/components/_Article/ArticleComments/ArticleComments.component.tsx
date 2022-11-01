import { useContext, useEffect, useState } from "react";
import { getData } from "../../../utils/data.utils";
import useToken from "../../../hooks/useToken";

import { BlogContext } from "../../../context/Blog.context";

import { ReactComponent as DeleteSvg } from "../../../assets/delete-icon.svg";
import noProfilePicture from "../../../assets/no-image-profile.webp";

import {
  CommentProps,
  fetchedBlogData,
  usersProps,
} from "../../../types/types";
import "./ArticleComments.styles.css";

const ArticleComments = ({ article }: CommentProps) => {
  const { token } = useToken();
  const { setBlog } = useContext(BlogContext);
  const [users, setUsers] = useState<usersProps[]>([]);

  useEffect(() => {
    const handleGetUsers = () => {
      fetch("https://api.stefanpenk.com/getusersimg")
        .then((data) => data.json())
        .then((json) => setUsers(json.users));
    };
    handleGetUsers();
  }, []);

  const handleDeleteComment = async (id: string) => {
    if (article.id === undefined) return;
    const articleId = article.id;
    async function deleteComment(articleId: string, id: string) {
      return fetch("https://api.stefanpenk.com/deletecomment", {
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
      "https://api.stefanpenk.com/blog"
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
        const { user, id, text, date } = comment;
        const userImg = users.find((singleUser) => singleUser.user === user);
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
                    !userImg || userImg.profileImg === ""
                      ? noProfilePicture
                      : userImg.profileImg
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
