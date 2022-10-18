import { useState } from "react";
import uniqid from "uniqid";
import { storage } from "../../../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { ReactComponent as Edit } from "../../../assets/edit-icon.svg";

import { ProfileImageProps } from "../../../types/types";
import "./ProfileImage.styles.css";

const ProfileImage = ({ token, saveToken }: ProfileImageProps) => {
  const noProfileImg =
    "https://firebasestorage.googleapis.com/v0/b/foocoding-react-project.appspot.com/o/ProfileImages%2Fno-image-profile.webp?alt=media&token=3a7b435a-117f-4d36-9166-4d9fe242926c";
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState("");
  const [progress, setProgress] = useState(0);
  const { profileImg, user } = token!;

  const handleProfileMouseOver = () => {
    setIsHovering(true);
  };

  const handleProfileMouseOut = () => {
    setIsHovering(false);
  };

  async function sendNewProfileImage(username: string, profileImg: string) {
    return fetch("https://api.stefanpenk.comchangeprofilepicture", {
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
    <>
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
      <p className="profile-img-error">{imageError}</p>
    </>
  );
};

export default ProfileImage;
