import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfileDetails = (props) => {
  const { email, name, username, gender, city, links } = props;
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        if (token === email) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [email]);

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
              <i className="fa-solid fa-location-dot"></i>{" "}
              {city === "" ? "Add your city" : city}
            </p>
            {isOwner && (
              <p
                onClick={() =>
                  navigate(`/Trip-connect/profile/edit/${username}`)
                }
                className="profile-edit-button"
              >
                <i className="fa-solid fa-pen-to-square"></i> Complete Your
                Profile
              </p>
            )}
          </div>
        </div>
        <div className="socail-links">
          <h3 className="text-left-border">Soical Links </h3>
          <div className="social-icons">
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !links.instagram && e.preventDefault()}
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href={links.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !links.facebook && e.preventDefault()}
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href={links.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !links.youtube && e.preventDefault()}
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href={links.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !links.twitter && e.preventDefault()}
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href={links.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !links.website && e.preventDefault()}
            >
              <i className="fa-solid fa-globe"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
