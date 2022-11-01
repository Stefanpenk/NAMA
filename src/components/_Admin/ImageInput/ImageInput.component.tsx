import { useState } from "react";

import { ReactComponent as ImageIcon } from "../../../assets/image-icon.svg";

import { ImageInputProps } from "../../../types/types.js";

const ImageInput = ({ url, setUrl }: ImageInputProps) => {
  const [error, setError] = useState("");

  const handleSubmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    if (file.size >= 512000) {
      setError("Image size can be maximum 500kb.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    const uploadImage = async (formData: any) => {
      const response = await fetch("https://api.stefanpenk.com/blogpicture", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      const url = res.res;
      if (res.res.code === "LIMIT_FILE_SIZE") {
        setError("Image must be max 100kb");
        return setTimeout(() => setError(""), 4000);
      }
      if (res.res.storageErrors) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      setUrl(url);
    };
    uploadImage(formData);
  };

  return (
    <div className="file-card-container">
      <div className="file-card">
        <div className="file-card-form">
          <input
            id="add-image"
            type="file"
            placeholder="add image"
            accept="image/jpeg, image/png, image/webp"
            required
            onChange={handleSubmitImage}
          />
          <button className="file-button">Upload</button>
        </div>
        <p className="file-main-text">Supported files:</p>
        <p className="file-info-text">PNG, JPG</p>
        <p className="file-upload-progress">{error !== "" && error}</p>
      </div>
      <div className="file-card-preview">
        {url ? (
          <img src={url} alt="background image for blog article." />
        ) : (
          <div className="image-preview">
            <p className="image-preview-text">Image Preview</p>
            <ImageIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
