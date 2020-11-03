import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VideoCamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";

function Post() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // insert to db
    setInput("");
    setImageUrl("");
  };
  return (
    <div className="post">
      <div className="post__content">
        <Avatar />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="post__input"
            placeholder="What's on your mind, Phuong Thao?"
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
