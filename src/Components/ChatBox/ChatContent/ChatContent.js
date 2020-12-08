import { Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./ChatContent.css";
import { db } from "../../../Firebase/Firebase";
import Message from "./Message/Message";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function ChatContent({ user, userSelected }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const history = useHistory();

  if (user === false) {
    history.push("/login");
  }

  localStorage.setItem("receiverId", userSelected.uid);
  localStorage.setItem("receiverName", userSelected.displayName);
  localStorage.setItem("receiverAvatar", userSelected.photoURL);
  localStorage.setItem("senderAvatar", user.photoURL);
  localStorage.setItem("senderName", user.displayName);

  useEffect(() => {
    // read all messages in the collection
    // even with role of sender or receiver
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postMessage = (event) => {
    event.preventDefault();

    // save message to sender collection
    db.collection("users").doc(user.uid).collection("messages").add({
      text: message,
      senderId: user.uid,
      receiverId: userSelected.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // save message to receiver collection
    db.collection("users").doc(userSelected?.uid).collection("messages").add({
      text: message,
      senderId: user.uid,
      receiverId: userSelected.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <>
      <div className="chat__content">
        <p className="messageTitle">Chat Message</p>

        <div className="messages">
          {messages.map((mes) => (
            <Message
              key={`${mes.senderId}${mes.timestamp}`}
              senderId={mes.senderId}
              receiverId={mes.receiverId}
              text={mes.text}
              timestamp={mes.timestamp}
            />
          ))}
        </div>

        <form className="messageInput" onSubmit={postMessage}>
          <input
            type="text"
            placeholder="Write message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input
            type="submit"
            disabled={!message}
            className="transparent__submit"
          />
          <div className="sendIcon" onClick={postMessage}>
            <Send color="primary" />
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(ChatContent);
