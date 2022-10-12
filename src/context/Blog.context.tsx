import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data.utils";
import {
  BlogProps,
  Props,
  fetchedBlogData,
  AdminBlogCard,
} from "../types/types";

export const compareNumbers = (a: BlogProps, b: BlogProps) =>
  Date.parse(b.date) - Date.parse(a.date);

export const BlogDefaultValue = {
  id: "",
  title: "",
  text: "",
  imgUrl: "",
  date: "",
  rating: [{ user: "", number: 0 }],
  author: "",
  authorImg: "",
  comments: [{ id: "", user: "", date: "", text: "", profileImg: "" }],
};

const BlogContextDefaultValue = {
  blog: [BlogDefaultValue],
  setBlog: (blog: BlogProps[]) => {},
  archive: [BlogDefaultValue],
  setArchive: (archive: BlogProps[]) => {},
};

export const BlogContext = createContext(BlogContextDefaultValue);

export const BlogContextProvider: React.FC<Props> = ({ children }) => {
  const [blog, setBlog] = useState<BlogProps[]>([BlogDefaultValue]);
  const [archive, setArchive] = useState<BlogProps[]>([BlogDefaultValue]);

  useEffect(() => {
    const getBlog = async () => {
      const api = await getData<fetchedBlogData>("http://localhost:8080/blog");
      api.blog.sort(compareNumbers);
      setBlog(api.blog);
    };
    getBlog();
  }, []);

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

  const value = { blog, setBlog, archive, setArchive };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
