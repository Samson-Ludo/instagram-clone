import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`image/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //   progrees function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //   error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //   complete function
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            // post image url into db
            db.collection("posts").add({
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageUrl,
              username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageUpload">
      <h2>Make a post</h2>
      <progress className="imageUpload-progress" value={progress} max="100" />
      <textarea
        className="imageUpload-textarea"
        type="text"
        placeholder="Eneer a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageUpload-button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
