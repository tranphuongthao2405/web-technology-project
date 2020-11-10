import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VideoCamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "../../../Hoc/StateProvider";
import firebase from "firebase";
import axios from "axios";

function Post() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      profilePic: user.photoURL,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      image: imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/createPosts",
        post,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("@token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setInput("");
    setImageUrl("");
  };
  return (
    <div className="post">
      <div className="post__content">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="post__input"
            placeholder={`What's on your mind, ${user.displayName}?`}
            type="text"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image URL (Optional)"
            type="text"
          />
          <button onClick={handleSubmit} type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="post__options">
        <div className="post__option">
          <VideoCamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="post__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="post__option">
          <InsertEmotionIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default Post;
