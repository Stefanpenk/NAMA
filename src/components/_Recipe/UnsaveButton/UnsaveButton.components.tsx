import { DeleteFromFavourite } from "../../../utils/HandlingSaveDeleteFavourite/deleteFromFavourite.utils";

import { ReactComponent as Save } from "../../../assets/save-icon.svg";

import { SaveProps } from "../../../types/types";

import "./UnsaveButton.styles.css";

const UnsaveButton = ({ details, username, saveToken }: SaveProps) => {
  const handleUnsave = () => {
    DeleteFromFavourite({
      item: details,
      username: username,
      saveToken: saveToken,
    });
  };

  return (
    <button className="recipe-button unsave-button" onClick={handleUnsave}>
      <Save />
    </button>
  );
};

export default UnsaveButton;
