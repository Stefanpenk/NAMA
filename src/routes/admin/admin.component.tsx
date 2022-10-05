import { useState, useContext } from "react";
import { BlogContext } from "../../context/Blog.context";

import AddBlog from "../../components/Admin/AddBlog/AddBlog.component";
import Users from "../../components/Admin/Users/Users.component";
import Blogs from "../../components/Admin/Blogs/Blogs.component";
import Archive from "../../components/Admin/Archive/Archive.component";
import NavButton from "../../components/Admin/NavButton/NavButton.components";

import { ReactComponent as UsersIcon } from "../../assets/users-icon.svg";
import { ReactComponent as BlogIcon } from "../../assets/blog-icon.svg";
import { ReactComponent as AddBlogIcon } from "../../assets/add-blog-icon.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/archive-icon.svg";

import "./admin.styles.css";

const Admin = () => {
  const { blog, setBlog } = useContext(BlogContext);
  const [page, setPage] = useState("1");

  return (
    <section className="section-admin nav-padding">
      <nav className="admin-nav">
        <NavButton
          active={page === "1" ? "active" : ""}
          svg={<AddBlogIcon />}
          dataPage="1"
          setPage={setPage}
        />
        <NavButton
          active={page === "2" ? "active" : ""}
          svg={<BlogIcon />}
          dataPage="2"
          setPage={setPage}
        />
        <NavButton
          active={page === "4" ? "active" : ""}
          svg={<ArchiveIcon />}
          dataPage="4"
          setPage={setPage}
        />
        <NavButton
          active={page === "3" ? "active" : ""}
          svg={<UsersIcon />}
          dataPage="3"
          setPage={setPage}
        />
      </nav>
      <div className="admin-component-container">
        {page === "1" && <AddBlog />}
        {page === "2" && <Blogs />}
        {page === "3" && <Users />}
        {page === "4" && <Archive />}
      </div>
    </section>
  );
};

export default Admin;
