import React, { useState } from "react";
import "./ChatBox.css";
import ChatContent from "./ChatContent/ChatContent";
import ChatSideBar from "./ChatSidebar/ChatSideBar";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";

function ChatBox({ user }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const history = useHistory();

  if (user === false || !localStorage.userId) {
    history.push("/login");
  }

  const handleOpenMessage = (userSelected) => {
    setUserSelected(userSelected);
    setChatOpen(true);
  };

  return (
    <div className="boxchat">
      <Header user={user} />
      <div className="chatbox">
        <ChatSideBar user={user} handleSelect={handleOpenMessage} />
        {user && userSelected && chatOpen ? (
          <>
            <ChatContent
              user={user}
              isOpen={chatOpen}
              userSelected={userSelected}
            />
          </>
        ) : (
          <div className="selectText">
            Select a friend to start sending messages!
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
