import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./search.styles.css";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      navigate("/searched/" + input);
    }
    setInput("");
  };

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form action="" className="search" onSubmit={submitHandler}>
      <div className="input-container">
        <i className="fa fa-search icon"></i>
        <input type="text" value={input} onChange={handleSetValue} />
      </div>
    </form>
  );
};
export default Search;
