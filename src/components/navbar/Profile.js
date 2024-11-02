import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavbarCSS.css";
import { jwtDecode } from "jwt-decode";
import clearAuthToken from "../../clearAuthToken";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const henadleProfileClick = async () => {
    const token = localStorage.getItem("authToken");
    const data = jwtDecode(token);
    const email = data.email;
    let response = await fetch("http://localhost:5000/api/user/profileDetail", {
      method: "POST",
      headers: { "content-type": "Application/json" },
      body: JSON.stringify({ email }),
    });
    response = await response.json();
    if (response.success) {
      const { username } = response.result;
      navigate(`/Trip-connect/Profile/${username}`);
      window.location.reload();
    } else {
      navigate("/Trip-connect/notfound");
      window.location.reload();
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOnLogout = () => {
    clearAuthToken();
    navigate("/Trip-connect");
    window.location.reload();
  };

  return (
    <div className="profile-section" ref={dropdownRef}>
      <p
        className="profile-section-profile-label"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Profile <i className="fa-solid fa-sort-down"></i>
      </p>

      {showDropdown && (
        <div className="dropdown-menu">
          <p
            className="main-links-style"
            onClick={() => setShowDropdown(false)}
          >
            <p onClick={henadleProfileClick} className="no-outline-navbar">
              My Profile
            </p>
          </p>
          <p className="main-links-style Logout" onClick={handleOnLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
