import React, { useEffect, useState } from "react";
import "./Posts.css";
import UploadImage from "./UploadImage/UploadImage";
import { db } from "../../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import Post from "./Post/Post";

function Posts({ user }) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  document.title = "Facebook";

  if (user === false) {
    history.push("/login");
  }

  // get all the posts from db
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="posts">
      <UploadImage />
      <div className="post">
        {user &&
          posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              noLikes={post.noLikes}
              userId={post.uid}
              timestamp={post.timestamp}
            />
          ))}
      </div>
    </div>
  );
}

export default Posts;
