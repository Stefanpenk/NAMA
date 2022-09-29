import { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data.utils";
import { BlogProps } from "../types/types";

export const BlogContext = createContext(null as any);

export const BlogContextProvider = ({ children }: any) => {
  const [blog, setBlog] = useState<BlogProps[]>([
    {
      id: "",
      title: "",
      text: "",
      imgUrl: "",
      date: "",
      rating: [{ user: "", number: 0 }],
      author: "",
      authorImg: "",
    },
  ]);

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
