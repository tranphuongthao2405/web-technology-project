import React from "react";
import "./StoryBoard.css";
import Story from "../Story/Story";

function StoryBoard() {
  return (
    <div className="storyBoard">
      <Story
        image="https://images-na.ssl-images-amazon.com/images/I/91Ty3S%2BFprL._AC_SX522_.jpg"
        profileSrc="https://sewausa.org/resources/Sewa%20USA%20Images/Projects/Sewa%20Aspire/Volunteer%20list/9.png"
        title="User 1"
      />
      <Story
        image="https://i.pinimg.com/originals/63/25/eb/6325eb3b21af5e3ff7cd5af7d01f9fdd.jpg"
        profileSrc="https://workbootsexplained.com/wp-content/uploads/2020/03/profile-picture-round-5.png"
        title="User 2"
      />
      <Story
        image="https://previews.123rf.com/images/ksym/ksym2003/ksym200300001/142386196-vertical-seamless-texture-with-cute-blue-flowers-and-leaves-watercolor-painting.jpg"
        profileSrc="https://www.irec.co.il/wp-content/uploads/2015/02/Beeri-round-profile-pic-e1466524893279.png"
        title="User 3"
      />
      <Story
        image="https://images-na.ssl-images-amazon.com/images/I/71O3QnAgP0L._AC_SX522_.jpg"
        profileSrc="https://dinhcutoancau.com/wp-content/uploads/2017/02/avatar-round-3-2.png"
        title="User 4"
      />
      <Story
        image="https://previews.123rf.com/images/rinder/rinder1111/rinder111100181/11142345-nice-vertical-abstract-original-flower-painting-on-canvas.jpg"
        profileSrc="https://www.pikpng.com/pngl/m/541-5413318_matt-round-png-round-portrait-pic-png-clipart.png"
        title="User 5"
      />
    </div>
  );
}

export default StoryBoard;
