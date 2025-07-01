import React from "react";
import robotVideo from "../assets/robot1.mp4"; // Make sure the path is correct
import "./VideoBackground.css"; // Import CSS for styling

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted className="background-video">
        <source src={robotVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>Enjoy the robotic experience!</p>
      </div>
    </div>
  );
};

export default VideoBackground;
