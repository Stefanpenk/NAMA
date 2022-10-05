import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BlogContext } from "../../../context/Blog.context";
import { compareNumbers } from "../../../context/Blog.context";

import { ReactComponent as DeleteButton } from "../../../assets/delete-icon.svg";
import { ReactComponent as LinkButton } from "../../../assets/link-icon.svg";
import { AdminBlogCard } from "../../../types/types";

const AdminBlogCards = ({
  id,
  imgUrl,
  title,
  text,
  date,
  authorImg,
  author,
}: AdminBlogCard) => {
  const { blog, setBlog } = useContext(BlogContext);
  const [isActive, setIsActive] = useState("");

  const handleActive = (id: string) => {
    setIsActive(id);
  };

  const handleDeactive = () => {
    setIsActive("");
  };

  const handleDeleteBlog = async (id: string) => {
    async function deleteBlog(id: string) {
      return fetch("http://localhost:8080/deleteblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          setBlog(json.blog.sort(compareNumbers));
        });
    }
    await deleteBlog(id);
  };

  const isToday = (date: string) =>
    Math.round((Date.now() - Date.parse(date)) / 86400000 - 0.5) <= 3 && true;

  return (
    <div
      className="blogs-article"
      key={id}
      onMouseEnter={() => handleActive(id)}
      onMouseLeave={() => handleDeactive()}
    >
      {isToday(date) && (
        <div className="article-new">
          <p>NEW</p>
        </div>
      )}
      <div
        className="article-mini-img"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="article-mini-info">
        <div className="article-mini-title">{title}</div>
        <p className="article-mini-text">{text}</p>
      </div>
      <div className="article-mini-footer">
        <div className="article-mini-date">{date}</div>
        <div className="article-mini-author">
          <div
            className="article-mini-author-img"
            style={{
              backgroundImage: `url(${authorImg})`,
            }}
          ></div>
          <span>{author}</span>
        </div>
      </div>
      {isActive === id && (
        <div className="action-buttons-container">
          <button className="action-button">
            <Link className="link-button" to={"/article/" + id}>
              <LinkButton />
            </Link>
          </button>
          <button
            className="action-button"
            onClick={() => handleDeleteBlog(id)}
          >
            <DeleteButton />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogCards;
