import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data.utils";
import { BlogProps, Props, fetchedBlogData } from "../types/types";

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
  comments: [{ id: "", user: "", date: "", text: "" }],
};

const BlogContextDefaultValue = {
  blog: [BlogDefaultValue],
  setBlog: (blog: BlogProps[]) => {},
};

export const BlogContext = createContext(BlogContextDefaultValue);

export const BlogContextProvider: React.FC<Props> = ({ children }) => {
  const [blog, setBlog] = useState<BlogProps[]>([BlogDefaultValue]);

  useEffect(() => {
    const getBlog = async () => {
      const api = await getData<fetchedBlogData>("http://localhost:8080/blog");
      api.blog.sort(compareNumbers);
      setBlog(api.blog);
    };
    getBlog();
  }, []);

  const value = { blog, setBlog };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
