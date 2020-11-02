import React from "react";
import "./Feed.css";
import Post from "./Post/Post";
import StoryBoard from "./StoryBoard/StoryBoard";

function Feed() {
  return (
    <div className="feed">
      <StoryBoard />
      <Post />
    </div>
  );
}

export default Feed;
