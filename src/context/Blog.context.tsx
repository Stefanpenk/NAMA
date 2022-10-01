import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data.utils";
import { BlogProps, Props } from "../types/types";

const BlogDefaultValue = {
  id: "",
  title: "",
  text: "",
  imgUrl: "",
  date: "",
  rating: [{ user: "", number: 0 }],
  author: "",
  authorImg: "",
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
      const api = await getData<any>("http://localhost:8080/blog");
      setBlog(api.blog);
    };
    getBlog();
  }, []);
  const value = { blog, setBlog };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
