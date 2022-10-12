import { DetailsProps, TokenProps2 } from "../../types/types";

type DeleteProps = {
  item: DetailsProps;
  username: string;
  saveToken: (props: TokenProps2) => void;
};

export const DeleteFromFavourite = ({
  item,
  username,
  saveToken,
}: DeleteProps) => {
  const deleteData = item;
  async function sendData(user: string, deleteData: DetailsProps) {
    return fetch("http://localhost:8080/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, newData: deleteData }),
    })
      .then((data) => data.json())
      .then((json) => saveToken(json));
  }
  sendData(username, deleteData);
};
