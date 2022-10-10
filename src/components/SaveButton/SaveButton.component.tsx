import { useState } from "react";

import LoginModalWrapper from "../LoginModal/LoginModalWrapper.component";
import { saveToFavourite } from "../../utils/HandlingSaveDeleteFavourite/saveToFavourite";

import { DetailsProps, TokenProps } from "../../types/types";

import { ReactComponent as Save } from "../../assets/save-icon.svg";

type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps) => void;
};

const SaveButton = ({ details, username, saveToken }: SaveProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const handleSave = () => {
    if (username === "no") toggleLoginModal();
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
      <LoginModalWrapper
        isModalVisible={isModalVisible}
        onBackdropClick={toggleLoginModal}
        header="Login"
        message="Login to add this recipe as your favorite."
      />
    </>
  );
};

export default SaveButton;
