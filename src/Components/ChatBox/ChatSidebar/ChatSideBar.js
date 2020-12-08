import React, { useEffect, useState } from "react";
import "./ChatSidebar.css";
import ChatSidebarRow from "./ChatSidebarRow/ChatSidebarRow";
import { useHistory } from "react-router-dom";
import { db } from "../../../Firebase/Firebase";

function ChatSideBar({ user, handleSelect }) {
  const history = useHistory();
  const [users, setUsers] = useState();

  if (user === false) {
    history.push("/login");
  }

  // query all  users except current user for showing in row
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="chat__sidebar">
      <div className="chatTitle">
        <a href="/">
          <i className="searchBackIcon"></i>
        </a>
        <p>Chat Box</p>
      </div>
      {users !== undefined &&
        users.map((user) => (
          <ChatSidebarRow
            key={user?.uid}
            userSelected={user}
            handleSelect={handleSelect}
          />
        ))}
    </div>
  );
}

export default ChatSideBar;
