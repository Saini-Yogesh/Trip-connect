import React, { useEffect, useState } from "react";
import "./ProfileEditCSS.css";
import EditAbout from "./EditAbout";
import EditLinks from "./EditLinks";
import { useNavigate, useParams } from "react-router-dom";
import clearAuthToken from "../../clearAuthToken";

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authToken on component mount
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/Trip-connect", { replace: true });
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/profileDetail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfileData(data.result);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    })();
  }, [username, navigate]);

  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/user/profile/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();
      setProfileData(data.updatedProfile);
      alert("Data updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleOnLogout = () => {
    clearAuthToken();
    navigate("/Trip-connect");
    window.location.reload();
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
              onClick={handleOnLogout}
            >
              Logout
            </p>
          </div>
        </div>

        <div className="edit-form-content">
          {activeTab === "about" && profileData && (
            <EditAbout
              profileData={profileData}
              updateProfile={updateProfile}
            />
          )}
          {activeTab === "links" && profileData && (
            <EditLinks
              profileData={profileData}
              updateProfile={updateProfile}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
