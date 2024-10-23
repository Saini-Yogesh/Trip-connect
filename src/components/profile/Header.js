import React from "react";
import "./Profile.css";
import profileHeaderImage from "./profile-header-image.jpg";
const Header = () => {
  return (
    <div className="header">
      <img
        // src="https://cdn.pixabay.com/photo/2015/08/23/09/22/banner-902589_640.jpg"
        // src="https://www.shutterstock.com/image-vector/discover-world-poster-famous-attractions-260nw-654997897.jpg"
        src={`${profileHeaderImage}`}
        alt="Header Background"
        className="header-image"
      />
    </div>
  );
};

export default Header;
