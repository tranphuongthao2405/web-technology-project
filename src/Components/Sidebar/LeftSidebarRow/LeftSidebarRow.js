import React from "react";
import "./LeftSidebarRow.css";

function LeftSidebarRow({ imageLink, title, avatar, dropdown }) {
  return (
    <div className="sidebarRow">
      <img
        src={imageLink}
        alt=""
        className={`sidebarRow__icon ${avatar && "avatar"} ${
          dropdown && "vanish"
        }`}
      />
      <div className={`dropdownDiv ${dropdown && "display"}`}>
        <i className={`dropdown ${dropdown && "display"}`} />
      </div>
      <h2 className={`sidebarRow__title`}>{title}</h2>
    </div>
  );
}

export default LeftSidebarRow;
