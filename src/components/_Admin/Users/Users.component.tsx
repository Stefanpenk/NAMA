import { useState, useEffect } from "react";

import { ReactComponent as DeleteButton } from "../../../assets/delete-icon.svg";
import { ReactComponent as AdminProfile } from "../../../assets/admin-profile-icon.svg";
import { ReactComponent as UserProfile } from "../../../assets/comment-profile-icon.svg";

import { usersProps } from "../../../types/types";
import "./users.styles.css";
import FoodLoader from "../../Loaders/FoodLoader/FoodLoader";

const Users = () => {
  const [users, setUsers] = useState<usersProps[]>([]);
  const [response, setResponse] = useState("");

  const handleGetUsers = () => {
    fetch("https://api.stefanpenk.com/getusers")
      .then((data) => data.json())
      .then((json) => setUsers(json.users));
  };

  const handleDeleteUser = async (user: string) => {
    async function deleteUser(user: string) {
      return fetch("https://api.stefanpenk.com/deleteuser", {
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
          setTimeout(() => setResponse(""), 3000);
        });
    }
    await deleteUser(user);
    handleGetUsers();
  };

  const handleChangeRank = async (user: string) => {
    async function changeRank(user: string) {
      return fetch("https://api.stefanpenk.com/changerank", {
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
          setTimeout(() => setResponse(""), 3000);
        });
    }
    await changeRank(user);
    handleGetUsers();
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      {users.length === 0 && <FoodLoader />}
      {users.length > 0 && (
        <div className="admin-users-section">
          <h5 className="admin-title">Registered users:</h5>
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
                  <button
                    className="user-token"
                    onClick={() => handleChangeRank(user)}
                  >
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
      )}
    </>
  );
};

export default Users;
