/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ProfileSidebar.css";
import { db } from "../../../Firebase/Firebase";

function ProfileSidebar({ username }) {
  var [nposts, setNPosts] = useState([]);
  const [currentUserData, setCurrentUserData] = useState();
  const birthday = new Date(currentUserData?.birthday.toDate());
  const birthdate = birthday.getDate();
  const birthmonth = birthday.getMonth() + 1;
  const birthyear = birthday.getFullYear();

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        // only get posts with the same username
        if (doc.data().username === username) {
          // get all the imageurl - 9 photos
          if (nposts.length !== 9) {
            // check for duplicate url
            if (!nposts.includes(doc.data().imageUrl)) {
              nposts.push(doc.data().imageUrl);
            }
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        if (doc.data().displayName === username) {
          setCurrentUserData(doc.data());
        }
      });
    });
  }, []);

  return (
    <div className="profileSidebar">
      <div className="posts2">
        <h1>Intro</h1>
        <div className="intro">
          {currentUserData?.birthday ? (
            <div className="introblock">
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/IqqJ0EjDF9B.png"
                className="birthday"
                alt=""
              />
              <h1>{`${birthdate} - ${birthmonth} - ${birthyear}`}</h1>
            </div>
          ) : (
            console.log()
          )}
        </div>
      </div>
      <div className="posts2">
        <h1>Photos</h1>
        <div className="photos">
          {nposts.length === 0 ? (
            <h3 className="NoNotif">
              It seems that there are no image posted by this user
            </h3>
          ) : (
            nposts.map((post) => <img src={post} alt="" />)
          )}
        </div>
      </div>
      <div class="hr profile" />
      <div class="policies profile">
        <p>Privacy</p>
        <p class="dot">·</p>
        <p>Terms</p>
        <p class="dot">·</p>
        <p>Advertising</p>
        <p class="dot">·</p>
        <p>Ad choices</p>
        <i class="ads" />
        <p class="dot">·</p>
        <p>Cookies</p>
        <p class="dot">·</p>
        <p>More</p>
        <p class="dot">·</p>
        <p>Facebook © 2020</p>
      </div>
    </div>
  );
}

export default ProfileSidebar;
