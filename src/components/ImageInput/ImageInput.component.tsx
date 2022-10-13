import { useState } from "react";
import uniqid from "uniqid";
import { storage } from "../../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ReactComponent as ImageIcon } from "../../assets/image-icon.svg";

type ImageInputProps = {
  url: string;
  setUrl: (url: string) => void;
};

const ImageInput = ({ url, setUrl }: ImageInputProps) => {
  const [progress, setProgress] = useState(0);

  const handleSubmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    const uploadImage = (file: File) => {
      const imageRef = ref(storage, `BlogImages/${uniqid() + file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url);
            setTimeout(() => setProgress(0), 2000);
          });
        }
      );
    };

    uploadImage(file);
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
        <p className="file-upload-progress">
          {progress > 0 && `Uploaded: ${progress}%`}
        </p>
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
