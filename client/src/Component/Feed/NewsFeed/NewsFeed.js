import React from "react";
import "./NewsFeed.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ExpandMoreOutlined } from "@material-ui/icons";

function NewsFeed({ profilePic, username, image, timestamp, message }) {
  const seconds =
    Math.floor(timestamp.nanoseconds / 1000000 / 60000) + timestamp.seconds;
  const time = new Date(seconds * 1000).toUTCString();
  return (
    <div className="newsfeed">
      <div className="newsfeed__top">
        <Avatar src={profilePic} className="newsfeed__avatar" />
        <div className="newsfeed__topInfo">
          <h3>{username}</h3>
          <p>{time}</p>
        </div>
      </div>

      <div className="newsfeed__bottom">
        <p>{message}</p>
      </div>

      <div className="newsfeed__image">
        <img src={image} alt="" />
      </div>

      <div className="newsfeed__options">
        <div className="newsfeed__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="newsfeed__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="newsfeed__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="newsfeed__option">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;
