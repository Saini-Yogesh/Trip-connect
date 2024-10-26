import React, { useState } from "react";
import "./ProfileEditCSS.css";
import EditAbout from "./EditAbout";
import EditLinks from "./EditLinks";

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState("about");

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <>
      <div style={{ height: "15vmin" }}></div>
      <div className="profile-edit-container">
        <div className="sidebar">
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
            alt="Profile"
            className="Edit-profile-image"
          />
          <div className="options">
            <p
              className="Edit-prfile-button"
              onClick={() => setActiveTab("about")}
            >
              About me
            </p>
            <p
              className="Edit-prfile-button"
              onClick={() => setActiveTab("links")}
            >
              Social Links
            </p>
            <p className="Edit-prfile-button">Change Password</p>
            <p
              className="Edit-prfile-button Edit-prfile-button-logout"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>

        <div className="edit-form-content">
          {activeTab === "about" && <EditAbout />}
          {activeTab === "links" && <EditLinks />}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
