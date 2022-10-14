import { ReactComponent as Save } from "../../../assets/save-icon.svg";

import { DeleteFromFavourite } from "../../../utils/HandlingSaveDeleteFavourite/deleteFromFavourite.utils";

import { DetailsProps, TokenProps2 } from "../../../types/types";

import "./UnsaveButton.styles.css";

type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps2) => void;
};

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
