import { useContext } from "react";
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
          return (
            <AdminBlogCards key={article.id} article={article} page={page} />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
