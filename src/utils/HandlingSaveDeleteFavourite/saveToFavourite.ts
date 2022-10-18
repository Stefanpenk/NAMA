import { DetailsProps, TokenProps2 } from "../../types/types";

type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps2) => void;
};

export const saveToFavourite = ({
  details,
  saveToken,
  username,
}: SaveProps) => {
  const newData = details;
  async function sendData(user: string, newData: DetailsProps) {
    return fetch("https://servernama.onrender.com/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, newData: newData }),
    })
      .then((data) => data.json())
      .then((token) => saveToken(token));
  }
  sendData(username, newData);
};
