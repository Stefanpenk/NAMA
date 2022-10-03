import { useState } from "react";
import uniqid from "uniqid";
import { getCurrentDate } from "../../utils/currentdate.utils";
import { useContext } from "react";
import { BlogContext } from "../../context/Blog.context";

import "./admin.styles.css";
import { getData } from "../../utils/data.utils";

type usersProps = {
  token: string;
  user: string;
  name: string;
};

const Admin = () => {
  const { blog, setBlog } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [text, setText] = useState("");
  const [users, setUsers] = useState<usersProps[]>([
    { token: "", user: "", name: "" },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uniqid();
    const date = getCurrentDate("/");

    async function sendData(
      id: string,
      title: string,
      text: string,
      imgUrl: string,
      date: string,
      author: string,
      authorImg: string
    ) {
      return fetch("http://localhost:8080/addblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          text: text,
          imgUrl: imgUrl,
          date: date,
          rating: [],
          author: author,
          authorImg: authorImg,
          comments: [],
        }),
      })
        .then((data) => data.json())
        .then((result) => setBlog(result.blog));
    }
    sendData(id, title, text, imgUrl, date, author, authorImg);

    setTitle("");
    setAuthor("");
    setAuthorImg("");
    setimgUrl("");
    setText("");
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    switch (id) {
      case "titleInput":
        setTitle(value);
        break;
      case "authorInput":
        setAuthor(value);
        break;
      case "authorImgInput":
        setAuthorImg(value);
        break;
      case "imgUrlInput":
        setimgUrl(value);
        break;
      default:
        console.log(`don't know ${id}`);
    }
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGetUsers = () => {
    fetch("http://localhost:8080/getusers")
      .then((data) => data.json())
      .then((json) => setUsers(json.users));
  };
  console.log(users);
  return (
    <section className="section-admin nav-padding">
      <div className="admin-blog-form-container">
        <h3 className="auth-title">Some thoughts to share for today?</h3>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            id="titleInput"
            type="text"
            placeholder="title"
            required
            value={title}
            onChange={handleInput}
          />
          <input
            id="authorInput"
            type="text"
            placeholder="author"
            required
            value={author}
            onChange={handleInput}
          />
          <input
            id="authorImgInput"
            type="text"
            placeholder="author image"
            required
            value={authorImg}
            onChange={handleInput}
          />
          <input
            id="imgUrlInput"
            type="text"
            placeholder="imgUrl"
            required
            value={imgUrl}
            onChange={handleInput}
          />
          <textarea
            id="textTextarea"
            name="textArea"
            rows={5}
            cols={33}
            required
            placeholder="text"
            value={text}
            onChange={handleTextarea}
          />
          <button className="auth-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="admin-users-container">
        {users.map((user) => (
          <div key={user.name} className="admin-users-user">
            <h5>{user.name}</h5>
            <p>{user.user}</p>
            <p>{user.token}</p>
          </div>
        ))}
        <button onClick={handleGetUsers} className="auth-button"></button>
      </div>
    </section>
  );
};

export default Admin;
