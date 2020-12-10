import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import RightSidebarRow from "./RightSidebarRow/RightSidebarRow";
import { db } from "../../Firebase/Firebase";

function RightSidebar() {
  const [users, setUsers] = useState();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="right__sidebar">
      <div className="hr" />

      <div className="detail">
        <h1>Contacts</h1>
        <i className="searchIcon2" />
        <i className="more" />
      </div>
      <div className="contacts">
        {users &&
          users.map((u) => (
            <RightSidebarRow
              userId={u.uid}
              imageUrl={u.photoURL}
              title={u.displayName}
            />
          ))}
      </div>
    </div>
  );
}

export default RightSidebar;
