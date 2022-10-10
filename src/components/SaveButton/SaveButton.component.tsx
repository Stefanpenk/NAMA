import { ReactComponent as Save } from "../../assets/save-icon.svg";
import { saveToFavourite } from "../../utils/HandlingSaveDeleteFavourite/saveToFavourite";
import { DetailsProps, TokenProps } from "../../types/types";

type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps) => void;
};

const SaveButton = ({ details, username, saveToken }: SaveProps) => {
  const handleSave = () => {
    if (username === "no") alert("login");
    saveToFavourite({
      details: details,
      username: username,
      saveToken: saveToken,
    });
  };

  return (
    <button className="recipe-button" onClick={handleSave}>
      <Save />
    </button>
  );
};

export default SaveButton;
