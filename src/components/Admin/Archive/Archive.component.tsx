import { useEffect, useContext } from "react";
import { fetchedBlogData } from "../../../types/types";
import { getData } from "../../../utils/data.utils";
import { compareNumbers } from "../../../context/Blog.context";
import AdminBlogCards from "../AdminBlogCard/AdminBlogCards.component";
import { PageProp } from "../../../types/types";
import { BlogContext } from "../../../context/Blog.context";

const Archive = ({ page }: PageProp) => {
  const { archive, setArchive } = useContext(BlogContext);

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

  return (
    <div className="blogs-container">
      <h5 className="admin-title">Deleted Blogs:</h5>
      <div className="blogs-articles-container">
        {archive.length === 0 ? (
          <p>Archive is empty</p>
        ) : (
          archive.map((singleBlog) => {
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
                page={page}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Archive;
