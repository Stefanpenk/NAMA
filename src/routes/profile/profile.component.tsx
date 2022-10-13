import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import uniqid from "uniqid";
import { storage } from "../../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MealCard from "../../components/MealCard/MealCard";

import noRecipes from "../../assets/no-recipes.webp";
import { ReactComponent as Edit } from "../../assets/edit-icon.svg";

import { DetailsProps } from "../../types/types";

import "./profile.styles.css";

const Profile = () => {
  const noProfileImg =
    "https://firebasestorage.googleapis.com/v0/b/foocoding-react-project.appspot.com/o/ProfileImages%2Fno-image-profile.webp?alt=media&token=3a7b435a-117f-4d36-9166-4d9fe242926c";
  const { removeToken, token, saveToken } = useToken();
  const { profileImg, name, user, recipes } = token!;
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");

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
    }).then((data) => data.json().then((json) => saveToken(json)));
  }

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log(file);
    if (!file) return;
    if (file.size >= 102400) {
      setImageError("Image size can be maximum 100kb.");
      setTimeout(() => setImageError(""), 2000);
      return;
    }
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
            accept="image/jpeg, image/png, image/webp"
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
        <h3 className="profile-title">{name}</h3>
        <h4 className="profile-subtitle">{user}</h4>
        <p className="profile-img-error">{imageError}</p>
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
