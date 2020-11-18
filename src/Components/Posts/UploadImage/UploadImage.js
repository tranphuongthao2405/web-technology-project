import React, { useState, useRef, useEffect } from "react";
import "./UploadImage.css";
import Dialog from "@material-ui/core/Dialog";
import { storage, db, auth } from "../../../Firebase/Firebase";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "firebase";

function UploadImage() {
  const user = firebase.auth().currentUser;
  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [noLikes, setNoLikes] = useState(0);
  const [scroll, setScroll] = useState("paper");

  const handleChange = (event) => {
    // check if file exists and get first file
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }

    // create blob url with pre blob: for file
    setImageURL(URL.createObjectURL(event.target.files[0]));
  };

  const uploadFile = () => {
    document.getElementsByClassName("uploadInput")[0].click();
  };

  const handleClickOpen = (scrollType) => () => {
    setOpenDialog(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setImage("");
    setImageURL("");
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  const handleUpload = (event) => {
    if (document.getElementsByClassName("hidden")[0]) {
      document.getElementsByClassName("hidden")[0].classList.remove("hidden");
    }
    document.getElementsByClassName("postButton").disabled = true;
    document.getElementsByClassName("postButton")[0].classList.add("disabled");

    if (caption === "" && imageURL === "") {
      alert("You must fill the post with caption or images or both.");
    } else {
      event.preventDefault();
      if (imageURL === "") {
        // insert post into db without imageurl
        db.collection("posts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imageUrl: "",
          noLikes: noLikes,
          username: user?.displayName,
          uid: user?.uid,
        });
        handleClose();
        setProgress(0);
        setCaption("");
        setImage(null);
      } else {
        // upload image to firebase storage
        const uploadImage = storage.ref(`images/${image.name}`).put(image);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            // count % has been uploaded on upload progress
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            alert(error.message);
          },
          () => {
            // do not store image directly in db
            // just store url direct to image in firebase storage
            storage
              .ref("images")
              .child(image.name) // get all the image with image's name in storage
              .getDownloadURL()
              .then((url) => {
                db.collection("posts").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  imageUrl: url,
                  noLikes: noLikes,
                  username: user?.displayName,
                  uid: user?.uid,
                });
                handleClose();
                setProgress(0);
                setCaption("");
                setImage(null);
              });
          }
        );
      }
    }
  };

  return (
    <div className="image__upload">
      <Dialog open={openDialog} onClose={handleClose} scroll={scroll}>
        <div className="post__modal">
          <div className="modal__init">
            <h1>Create Post</h1>
            <CloseIcon className="closeModalIcon" onClick={handleClose} />
          </div>
          <div className="hr2" />
          <div className="profile__header">
            <img src={user?.photoURL} className="Avatar" alt="avatar" />
            <h1>{user?.displayName}</h1>
          </div>
          <div className="modal__input">
            <input
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="uploadInput"
            />
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="4"
              placeholder={`What's on your mind, ${user?.displayName}?`}
            />
          </div>
          <div className={`previewImage ${!image && "vanish"}`}>
            <img src={imageURL} className="preview" alt="preview" />
          </div>
          <img
            alt=""
            className="color__image"
            src="https://facebook.com/images/composer/SATP_Aa_square-2x.png"
          ></img>

          <progress value={progress} className="hidden" max="100" />

          <div className="modal__options">
            <div className="left">
              <h1>Add to your post</h1>
            </div>
            <div className="right">
              <i className="Icon room__icon" onClick={uploadFile} />
              <i className="Icon photo__icon2" onClick={uploadFile} />
              <i className="Icon friends__icon" />
              <i className="Icon feeling__icon2" />
              <i className="Icon tag__icon" />
              <i className="Icon more__icon" />
            </div>
          </div>
          <button
            onClick={handleUpload}
            type="submit"
            className={`postButton ${caption.length < 1 && "disabled"} ${
              imageURL !== "" && "visible"
            }`}
          >
            Post
          </button>
        </div>
      </Dialog>

      <div className="imageupload__container">
        <div className="postArea">
          <img src={user?.photoURL} className="Avatar" alt="avatar" />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onClick={handleClickOpen("body")}
            placeholder={`What's on your mind, ${user?.displayName}?`}
          />
        </div>
        <div className="hr" />
        <div className="options">
          <div className="liveVideo" onClick={handleClickOpen("body")}>
            <i className="liveVideo__icon" />
            <h2>Live video</h2>
          </div>
          <div className="photo" onClick={handleClickOpen("body")}>
            <i className="photo__icon" />
            <h2>Photo/Video</h2>
          </div>
          <div className="feeling" onClick={handleClickOpen("body")}>
            <i className="feeling__icon" />
            <h2>Feeling/Activity</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
