import React, { useState, useEffect } from "react";
import "./Feed.css";
import NewsFeed from "./NewsFeed/NewsFeed";
import Post from "./Post/Post";
import StoryBoard from "./StoryBoard/StoryBoard";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        if (!login) {
          const data = await axios.get(
            "http://localhost:5000/api/users/getPosts",
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("@token"),
              },
            }
          );
          setPosts(data.data);
          setLogin(true);
        } else {
          const data = await axios.get(
            "http://localhost:5000/api/users/getPosts"
          );
          setPosts(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="feed">
      <StoryBoard />
      <Post />
      {posts.map((post) => (
        <NewsFeed
          key={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
        />
      ))}
    </div>
  );
}

export default Feed;
