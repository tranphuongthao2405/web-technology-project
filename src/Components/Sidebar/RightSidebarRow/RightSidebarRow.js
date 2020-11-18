import React from "react";
import "./RightSidebarRow.css";
import { Avatar } from "@material-ui/core";

function RightSidebarRow({ imageUrl, title }) {
  return (
    <div className="right__sidebarRow">
      <Avatar className="avatar" src={imageUrl} alt={title} />
      <h1>{title}</h1>
    </div>
  );
}

export default RightSidebarRow;
