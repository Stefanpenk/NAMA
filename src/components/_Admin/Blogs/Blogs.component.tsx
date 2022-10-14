import { useContext, useState } from "react";
import { BlogContext } from "../../../context/Blog.context";

import "./blogs.styles.css";
import AdminBlogCards from "../AdminBlogCard/AdminBlogCards.component";
import { PageProp } from "../../../types/types";

const Blogs = ({ page }: PageProp) => {
  const { blog } = useContext(BlogContext);

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
              page={page}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
