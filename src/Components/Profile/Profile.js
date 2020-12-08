import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { storage, db } from "../../Firebase/Firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ImageUpload from "../Posts/UploadImage/UploadImage";
import Post from "../Posts/Post/Post";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";

function Profile({ user }) {
  // get parameters from url
  const { username, uid } = useParams();
  const [open, setOpen] = useState(false);
  // set attribute to dom element
  const [scroll, setScroll] = useState("paper");
  const [imageURL, setImageURL] = useState("");
  // track progress when upload avatar
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [profileUserData, setProfileUserData] = useState();
  // previous bio and current bio when have changes
  const [bio, setBio] = useState("");
  const [bioPresent, setBioPresent] = useState(false);

  // get current user
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        setProfileUserData(doc.data());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profileUserData !== undefined) {
    // in case search for other users then open their profile
    // only load profile if current user click on profile
    if (profileUserData?.displayName !== user?.displayName) {
      document.getElementsByClassName("inputImage")[0].disabled = true;
      document.getElementsByClassName("profileAvatar")[0].style.cursor =
        "context-menu";
      document.getElementsByClassName("bio")[0].style.display = "none";
      document.getElementById("documentUsername").style.marginBottom = "20px";
      document.getElementsByClassName("editProfile")[0].style.display = "none";
      document.getElementsByClassName("addFriend")[0].style.display = "flex";
    } else {
      document.getElementsByClassName("editProfile")[0].style.display = "flex";
      document.getElementsByClassName("addFriend")[0].style.display = "none";
    }
  }

  const handleChange = (e) => {
    setImageURL(e.target.files[0]);
  };

  const uploadFileWithClick = () => {
    document.getElementsByClassName("inputImage")[0].click();
  };

  const handleClose = () => {
    setOpen(false);
    setImageURL("");
  };

  document.title = `${username} | Facebook`;

  const descriptionElementRef = useRef();
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null && descriptionElement !== undefined) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // if user do not set imageurl
  // then set dialog box to open
  useEffect(() => {
    if (imageURL !== "") {
      setOpen(true);
    }
  }, [imageURL]);

  // handle upload progress when upload image
  const handleUpload = (event) => {
    document.getElementsByClassName("progress")[0].style.display = "block";
    event.preventDefault();
    const uploadTask = storage.ref(`profileImages/${user.uid}`).put(imageURL);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("profileImages")
          .child(user.uid)
          .getDownloadURL()
          .then((url) => {
            currentUser
              .updateProfile({
                photoURL: url,
              })
              .then(function () {
                db.collection("users")
                  .doc(uid)
                  .update({
                    photoURL: url,
                  })
                  .then(function () {
                    handleClose();
                    setProgress(0);

                    window.location.href = `/${user.displayName}/${user.uid}`;
                  });
              });
          });
      }
    );
  };

  const addBio = () => {
    document.getElementsByClassName("bio")[0].style.display = "none";
    document.getElementsByClassName("bioFields")[0].style.display = "flex";
  };

  const collapseBio = () => {
    document.getElementsByClassName("bio")[0].style.display = "block";
    document.getElementsByClassName("bioFields")[0].style.display = "none";
  };

  const bioSet = (e) => {
    setBio(e.target.value);
    // 101 is max length of bio
    if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      document.getElementsByClassName("saveButton")[0].style.backgroundColor =
        "#3A3B3C";
      document.getElementsByClassName("saveButton")[0].style.opacity = 0.4;
    } else {
      document.getElementsByClassName("saveButton")[0].style.opacity = 1;
      document.getElementsByClassName("saveButton")[0].style.backgroundColor =
        "#2D88FF";
    }
  };

  const bioUpdate = () => {
    // 101 is max length of bio
    if (101 - bio.length < 0 || bio.length === 0) {
      return;
    } else {
      db.collection("users")
        .doc(uid)
        .update({
          bio: bio,
        })
        .then(alert("Reload the page to see the updated bio"));
    }
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        // if bio is empty
        if (doc.data().bio && doc.data().bio === "") {
          setBioPresent(false);
        } else {
          setBio(doc.data().bio);
          setBioPresent(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // show edit attribute for dom and bio text
    if (bioPresent) {
      document.getElementsByClassName("bio")[0].innerText = "Edit";
      document.getElementsByClassName("bioText")[0].innerText = bio;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bioPresent]);

  return (
    <div className="profile">
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        className="dialog2"
      >
        <div class="image__upload">
          <div class="profileHeader">
            <p>
              Are you sure you want to change your profile picture ? Changes
              cannot be reverted{" "}
            </p>
            <progress
              value={progress}
              max="100"
              style={{ display: "none" }}
              className="progress"
            />
            <div className="buttons">
              <button onClick={handleUpload}>Yes</button>
              <button onClick={handleClose}>No</button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="profile__topSection">
        <div className="profile__coverPhoto">
          <img
            onClick={uploadFileWithClick}
            src={profileUserData?.photoURL}
            className="profileAvatar"
            alt=""
          />
          <input
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="inputImage"
          />
        </div>

        <h1 id="documentUsername">{username}</h1>
        <p className="bioText"></p>
        <p onClick={addBio} className="bio">
          Add Bio
        </p>
        <div className="bioFields">
          <textarea
            value={bio}
            placeholder="Describe about yourself"
            onChange={bioSet}
            className="bioInput"
          />
          <p>{`${101 - bio.length} characters left`}</p>
          <div className="cancelAndSaveButtons">
            <button onClick={collapseBio}>Cancel</button>
            <button onClick={bioUpdate} className="saveButton">
              Save
            </button>
          </div>
        </div>

        <div className="hr4" />

        <div className="profileHeader__options">
          <div className="profileHeader__left">
            <ul>
              <li className="selected">Timeline</li>
              <li>About</li>
              <li>Friends</li>
              <li>Photos</li>
              <li>Archive</li>
              <li>More</li>
              <li className="rect editProfile">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png"
                  alt=""
                />
                <p>Edit Profile</p>
              </li>
              <li className="rect addFriend">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png"
                  alt=""
                />
                <p>Add Friend</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="postsAndIntro">
        <ProfileSidebar username={username} />
        <div className="postAndWatch">
          {username === user?.displayName ? (
            <ImageUpload username={username} />
          ) : (
            console.log()
          )}
          <div className="post__content">
            {posts.map(({ id, post }) =>
              post.username !== username ? (
                console.log()
              ) : (
                <Post
                  key={id}
                  postId={id}
                  user={user}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  noLikes={post.noLikes}
                  userId={post.uid}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
