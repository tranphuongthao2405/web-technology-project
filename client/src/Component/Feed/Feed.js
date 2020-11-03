import React from "react";
import "./Feed.css";
import NewsFeed from "./NewsFeed/NewsFeed";
import Post from "./Post/Post";
import StoryBoard from "./StoryBoard/StoryBoard";

function Feed() {
  return (
    <div className="feed">
      <StoryBoard />
      <Post />
      <NewsFeed
        profilePic="https://i.pinimg.com/originals/92/18/fe/9218fe1773294a7b28f892389f4b39cf.jpg"
        message="test message 1"
        timestamp="timestamp"
        username="Tran Phuong Thao"
        image="https://code.org/shared/images/social-media/codeorg2019_social.png"
      />

      <NewsFeed
        profilePic="https://i.pinimg.com/originals/92/18/fe/9218fe1773294a7b28f892389f4b39cf.jpg"
        message="test message 2"
        timestamp="timestamp"
        username="Tran Phuong Thao"
      />
    </div>
  );
}

export default Feed;
