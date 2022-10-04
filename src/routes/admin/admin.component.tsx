import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { getCurrentDate } from "../../utils/currentdate.utils";
import { useContext } from "react";
import { BlogContext } from "../../context/Blog.context";

import "./admin.styles.css";
import { getData } from "../../utils/data.utils";
import { ReactComponent as DeleteButton } from "../../assets/delete-icon.svg";
import { ReactComponent as AdminProfile } from "../../assets/admin-profile-icon.svg";
import { ReactComponent as UserProfile } from "../../assets/comment-profile-icon.svg";

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
  const [response, setResponse] = useState("");

  const handleGetUsers = () => {
    fetch("http://localhost:8080/getusers")
      .then((data) => data.json())
      .then((json) => setUsers(json.users));
  };

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

  const handleDeleteUser = async (user: string) => {
    async function deleteUser(user: string) {
      return fetch("http://localhost:8080/deleteuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          setResponse(json.response);
          setTimeout(() => setResponse(""), 5000);
        });
    }
    await deleteUser(user);
    handleGetUsers();
  };
  console.log(response);

  const handleChangeRank = () => {
    console.log("works");
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

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
      <div className="admin-users-section">
        <div className="admin-users-container">
          {users.map((singleUser) => {
            const { name, token, user } = singleUser;
            return (
              <div key={name} className="admin-users-user">
                <div className="user-profile-container">
                  {token === "admin" ? <AdminProfile /> : <UserProfile />}
                </div>
                <h5 className="user-name">{name}</h5>
                <p className="user-username">{user}</p>
                <button className="user-token" onClick={handleChangeRank}>
                  {token === "admin" ? "admin" : "user"}
                </button>
                {token !== "admin" && (
                  <button
                    className="delete-fav"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <DeleteButton />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="admin-users-response">{response}</p>
      </div>
    </section>
  );
};

export default Admin;
