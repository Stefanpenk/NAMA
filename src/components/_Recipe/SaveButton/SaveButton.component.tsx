import { useState } from "react";
import { saveToFavourite } from "../../../utils/HandlingSaveDeleteFavourite/saveToFavourite";

import LoginPopupModal from "../../LoginModal/LoginPopupModal.component";

import { ReactComponent as Save } from "../../../assets/save-icon.svg";

import { SaveProps } from "../../../types/types";

const SaveButton = ({ details, username, saveToken }: SaveProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSave = () => {
    if (username === "no") return setIsModalVisible(true);
    saveToFavourite({
      details: details,
      username: username,
      saveToken: saveToken,
    });
  };

  return (
    <>
      <button className="recipe-button" onClick={handleSave}>
        <Save />
      </button>
      {isModalVisible && (
        <LoginPopupModal
          setIsModalVisible={setIsModalVisible}
          message="Please login to add this recipe to your favourite."
        />
      )}
    </>
  );
};

export default SaveButton;
