import { DetailsProps, TokenProps } from "../../types/types";

type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps) => void;
};

export const saveToFavourite = ({
  details,
  saveToken,
  username,
}: SaveProps) => {
  const newData = details;
  async function sendData(user: string, newData: DetailsProps) {
    return fetch("http://localhost:8080/add", {
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
