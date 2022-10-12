import { useState } from "react";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { storage } from "../../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MealCard from "../../components/MealCard/MealCard";

import noRecipes from "../../assets/no-recipes.jpeg";
import { ReactComponent as Edit } from "../../assets/edit-icon.svg";

import { DetailsProps } from "../../types/types";

import "./profile.styles.css";

const Profile = () => {
  const noProfileImg =
    "https://firebasestorage.googleapis.com/v0/b/foocoding-react-project.appspot.com/o/ProfileImages%2Fno-image-profile.jpg?alt=media&token=9f1f526f-7576-4a37-979f-742f8b522108";
  const { removeToken, token, saveToken } = useToken();
  const { profileImg, name, user, recipes } = token;
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const handleProfileMouseOver = () => {
    setIsHovering(true);
  };

  const handleProfileMouseOut = () => {
    setIsHovering(false);
  };

  async function sendNewProfileImage(username: string, profileImg: string) {
    return fetch("http://localhost:8080/changeprofilepicture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        profileImg: profileImg,
      }),
    }).then((data) => data.json().then((json) => saveToken(json.res)));
  }

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    const uploadImage = (file: File) => {
      const imageRef = ref(storage, `ProfileImages/${uniqid() + file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            sendNewProfileImage(user, url);
          });
        }
      );
    };
    uploadImage(file);
  };

  return (
    <section className="section-profile nav-padding">
      <div className="profile-background"></div>
      <div className="profile-container">
        <div
          className="profile-picture"
          style={{
            backgroundImage: `url(${
              profileImg === "" ? noProfileImg : profileImg
            })`,
          }}
          onMouseOver={handleProfileMouseOver}
          onMouseOut={handleProfileMouseOut}
        >
          <input
            type="file"
            className="profile-input"
            onChange={handleChangeProfileImage}
          />
          {isHovering && (
            <div className="profile-picture-mask">
              <Edit className="profile-picture-edit" />
              <p className="profile-picture-text">Edit</p>
            </div>
          )}
        </div>
        <h3 className="profile-title">{capitalizeFirstLetter(name)}</h3>
        <h4 className="profile-subtitle">{user}</h4>
        <h5 className="profile-fav-title">Your favourite recipes:</h5>
        <div className="profile-fav-recipes meals-list">
          {recipes.length === 0 && (
            <>
              <div
                className="fav-recipes-no-recipes"
                style={{
                  backgroundImage: `url(${noRecipes})`,
                }}
              >
                <p>No favourite recipes, yet.</p>
              </div>
            </>
          )}
          {recipes.map((recipe: DetailsProps) => {
            return <MealCard key={recipe.id} item={recipe} />;
          })}
        </div>
        <button className="profile-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
