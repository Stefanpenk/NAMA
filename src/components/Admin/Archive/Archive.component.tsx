import { useState, useEffect } from "react";
import { fetchedBlogData, AdminBlogCard } from "../../../types/types";
import { getData } from "../../../utils/data.utils";
import { compareNumbers } from "../../../context/Blog.context";
import AdminBlogCards from "../AdminBlogCard/AdminBlogCards.component";

const ArticleDefaultValue = [
  {
    id: "",
    imgUrl: "",
    title: "",
    text: "",
    date: "",
    authorImg: "",
    author: "",
  },
];

const Archive = () => {
  const [archive, setArchive] = useState<AdminBlogCard[]>(ArticleDefaultValue);

  useEffect(() => {
    const getArchiveBlogs = async () => {
      const api = await getData<fetchedBlogData>(
        "http://localhost:8080/archiveblogs"
      );
      api.blog.sort(compareNumbers);
      setArchive(api.blog);
    };
    getArchiveBlogs();
  }, []);

  console.log(archive);

  return (
    <div className="blogs-container">
      <h5 className="admin-title">Deleted Blogs:</h5>
      <div className="blogs-articles-container">
        {archive.map((singleBlog) => {
          const { id, imgUrl, title, text, date, authorImg, author } =
            singleBlog;
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

export default Archive;
