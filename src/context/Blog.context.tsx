import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data.utils";

type BlogProps = {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  date: string;
  rating: [{ user: string; number: number }];
  author: string;
  authorImg: string;
};

export const BlogContext = createContext(null as any);

export const BlogContextProvider = ({ children }: any) => {
  const [blog, setBlog] = useState<BlogProps[]>();

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
