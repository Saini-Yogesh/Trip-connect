import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarCSS.css";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authToken from localStorage
    setShowDropdown(false);
    navigate("/Trip-connect");
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
            <Link to="/Trip-connect/profile" className="no-outline-navbar">
              My Profile
            </Link>
          </p>
          <p
            className="main-links-style"
            onClick={() => setShowDropdown(false)}
          >
            <Link to="/Trip-connect/Settings" className="no-outline-navbar">
              Settings
            </Link>
          </p>
          <p className="main-links-style Logout" onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
