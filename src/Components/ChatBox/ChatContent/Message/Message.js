import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ senderId, receiverId, text }) {
  const userId = localStorage.userId;
  const receiver = localStorage.receiverId;
  const senderAvatar = localStorage.senderAvatar;
  const senderName = localStorage.senderName;
  const receiverAvatar = localStorage.receiverAvatar;
  const receiverName = localStorage.receiverName;

  return (
    <div className="message">
      {receiver === receiverId && userId === senderId ? (
        <div className="sender">
          <a href={`/${senderName}/${senderId}`}>
            <Avatar className="senderAvatar" alt="avatar" src={senderAvatar} />
          </a>
          <div className="right__chat">{text}</div>
        </div>
      ) : (
        <></>
      )}

      {userId === receiverId && receiver === senderId ? (
        <div className="receiver">
          <div className="left__info">
            <a href={`/${receiverName}/${receiver}`}>
              <Avatar
                className="receiverAvatar"
                src={receiverAvatar}
                alt="avatar"
              />
            </a>
            <p className="receiverName">{receiverName}</p>
          </div>
          <div className="left__chat">{text}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Message;
