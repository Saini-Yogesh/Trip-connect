import React from "react";
import "./Profile.css";

const ProfileDetails = () => {
  return (
    <>
      <div className="first-column">
        <div className="profile-details">
          <div className="profile-detail-image-section">
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-detail-image-section-icons">
              <i className="fa-solid fa-share-nodes"></i>
              <i className="fa-solid fa-medal"></i>
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
          <div className="profile-info">
            <p>
              <b>Yogesh Saini</b> (He/Him/his)
            </p>  
            <p>@yogesh_1___</p>
            <p>
              <i className="fa-solid fa-location-dot"></i> Rajasthan
            </p>
          </div>
        </div>
        <div className="socail-links">
          <h3 className="text-left-border">Soical Links </h3>
          <div className="social-icons">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-solid fa-globe"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
