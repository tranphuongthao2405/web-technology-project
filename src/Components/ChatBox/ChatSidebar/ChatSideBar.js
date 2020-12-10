import React, { useEffect, useState } from "react";
import "./ChatSidebar.css";
import ChatSidebarRow from "./ChatSidebarRow/ChatSidebarRow";
import { useHistory } from "react-router-dom";
import { db } from "../../../Firebase/Firebase";

function ChatSideBar({ user, handleSelect }) {
  const history = useHistory();
  const [users, setUsers] = useState();

  if (user === false || !localStorage.userId) {
    history.push("/login");
  }

  // query all  users except current user for showing in row
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      data = data.filter((dataUser) => dataUser.uid !== user.uid);
      setUsers(data);
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
        users.map((u) => (
          <ChatSidebarRow
            key={u.uid}
            userSelected={u}
            handleSelect={handleSelect}
          />
        ))}
    </div>
  );
}

export default ChatSideBar;
