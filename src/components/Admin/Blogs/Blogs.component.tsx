import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BlogContext } from "../../../context/Blog.context";
import { compareNumbers } from "../../../context/Blog.context";

import { ReactComponent as DeleteButton } from "../../../assets/delete-icon.svg";
import { ReactComponent as LinkButton } from "../../../assets/link-icon.svg";

import "./blogs.styles.css";
import AdminBlogCards from "../AdminBlogCard/AdminBlogCards.component";

const Blogs = () => {
  const { blog, setBlog } = useContext(BlogContext);
  const [isActive, setIsActive] = useState("");

  const handleActive = (id: string) => {
    setIsActive(id);
  };

  const handleDeactive = (id: string) => {
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
    <div className="blogs-container">
      <h5 className="admin-title">Actual blogs:</h5>
      <div className="blogs-articles-container">
        {blog.map((article) => {
          const { id, imgUrl, title, text, date, authorImg, author } = article;
          return (
            <AdminBlogCards
              key={id}
              id={id}
              imgUrl={imgUrl}
              title={title}
              text={text}
              date={date}
              authorImg={authorImg}
              author={author}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
