/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./ChatSidebarRow.css";

function ChatSidebarRow({ userSelected, handleSelect }) {
  const [isOpen, setOpen] = useState(false);

  const handleOpenMessage = () => {
    handleSelect(userSelected);
  };

  // need to add text of chat when userSelected have update chat

  return (
    <div className="chat__sidebarRow" onClick={handleOpenMessage}>
      <Avatar src={userSelected?.photoURL} />
      <div className="displayName">
        <a>{userSelected?.displayName}</a>
      </div>
    </div>
  );
}

export default ChatSidebarRow;
