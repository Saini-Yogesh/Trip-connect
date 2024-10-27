import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const ProfileDetails = (props) => {
  const { name, username, gender, city } = props;
  const navigate = useNavigate();
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
              <b>{name?.charAt(0).toUpperCase() + name?.slice(1)}</b>{" "}
              {gender === "male"
                ? "(He/Him/His)"
                : gender === "female"
                ? "(She/Her)"
                : "(They/Them)"}
            </p>
            <b>
              <i>
                <p>@{username}</p>
              </i>
            </b>
            <p>
              <i className="fa-solid fa-location-dot"></i> {city}
            </p>
            <p
              onClick={() => navigate("/Trip-connect/profile/edit")}
              className="profile-edit-button"
            >
              <i className="fa-solid fa-pen-to-square"></i> Complete Your
              Profile
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
