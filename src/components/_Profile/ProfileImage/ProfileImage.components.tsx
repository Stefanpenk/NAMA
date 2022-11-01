import { useState } from "react";

import { ReactComponent as Edit } from "../../../assets/edit-icon.svg";

import { ProfileImageProps } from "../../../types/types";
import "./ProfileImage.styles.css";

const ProfileImage = ({ token, saveToken }: ProfileImageProps) => {
  const noProfileImg =
    "https://firebasestorage.googleapis.com/v0/b/foocoding-react-project.appspot.com/o/ProfileImages%2Fno-image-profile.webp?alt=media&token=3a7b435a-117f-4d36-9166-4d9fe242926c";
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState("");
  const { profileImg, user } = token!;

  const handleProfileMouseOver = () => {
    setIsHovering(true);
  };

  const handleProfileMouseOut = () => {
    setIsHovering(false);
  };
  console.log(profileImg);
  const handleChangeProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files![0];
    if (!file) return;
    if (file.size >= 102400) {
      setImageError("Image size can be maximum 100kb.");
      setTimeout(() => setImageError(""), 2000);
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    formData.append("user", user);
    formData.append("profile_img", profileImg);
    const response = await fetch(
      "https://api.stefanpenk.com/changeprofilepicture",
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await response.json();
    if (res.res.code === "LIMIT_FILE_SIZE") {
      setImageError("Image must be max 100kb");
      return setTimeout(() => setImageError(""), 4000);
    }
    if (res.res.storageErrors) {
      setImageError(res.message);
      return setTimeout(() => setImageError(""), 4000);
    }
    saveToken(res);
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
