import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

function Post() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="post">
      <div className="post__content">
        <Avatar />
        <form>
          <input
            className="post__input"
            placeholder="What's on your mind, Phuong Thao?"
            type="text"
          />
          <input placeholder="image URL (Optional)" type="text" />
          <button onClick={handleSubmit} type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="post__option"></div>
    </div>
  );
}

export default Post;
