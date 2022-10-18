import { useState, useEffect, useContext } from "react";
import { getCurrentDate } from "../../../utils/currentdate.utils";
import uniqid from "uniqid";

import { BlogContext } from "../../../context/Blog.context";
import { compareNumbers } from "../../../context/Blog.context";

import ImageInput from "../ImageInput/ImageInput.component";

import { usersProps } from "../../../types/types";
import "./addBlog.styles.css";
import FoodLoader from "../../Loaders/FoodLoader/FoodLoader";

const defaultProfilePicture =
  "https://firebasestorage.googleapis.com/v0/b/foocoding-react-project.appspot.com/o/ProfileImages%2Fno-image-profile.webp?alt=media&token=3a7b435a-117f-4d36-9166-4d9fe242926c";

const AddBlog = () => {
  const { setBlog } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<usersProps[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const handleGetUsers = () => {
      fetch("https://servernama.onrender.com/getusers")
        .then((data) => data.json())
        .then((json) => setUsers(json.users));
    };

    handleGetUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgUrl === "") return setError("You must upload image first");
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
      return fetch("https://servernama.onrender.com/addblog", {
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
        .then((result) => setBlog(result.blog.sort(compareNumbers)));
    }
    sendData(id, title, text, imgUrl, date, author, authorImg);

    setTitle("");
    setAuthor("");
    setAuthorImg("");
    setimgUrl("");
    setText("");
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelectAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    if (name === "") return;
    setUser(name);
    const author = users.find((singleUser) => singleUser.name === name);
    setAuthor(author!.name);
    setAuthorImg(
      author!.profileImg === "" ? defaultProfilePicture : author!.profileImg
    );
  };

  return (
    <>
      {users.length === 0 && <FoodLoader />}
      {users.length > 0 && (
        <div className="admin-blog-form-container">
          <h3 className="admin-title">Some thoughts to share for today?</h3>
          <h4 className="form-label">Upload background image:</h4>
          <ImageInput url={imgUrl} setUrl={setimgUrl} />
          <form className="auth-form" onSubmit={handleSubmit}>
            <h4 className="form-label">Blog's title:</h4>
            <input
              id="titleInput"
              type="text"
              placeholder="title"
              required
              value={title}
              onChange={handleInput}
            />
            <h4 className="form-label">Blog's author:</h4>
            <select
              className="form-select-author"
              value={user}
              onChange={handleSelectAuthor}
              required
              placeholder="choose author"
            >
              <option value="" disabled>
                Select author
              </option>
              {users.map((singleUser) => {
                const { user, name, token } = singleUser;
                if (token === "admin")
                  return (
                    <option key={user} value={name}>
                      {name}
                    </option>
                  );
              })}
            </select>
            <h4 className="form-label">Blog's body:</h4>
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
          <p className="submit-error">{error}</p>
        </div>
      )}
    </>
  );
};

export default AddBlog;
