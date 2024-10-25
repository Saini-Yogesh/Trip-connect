import React, { useState, useEffect, useRef } from "react";
import "./NavbarCSS.css";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Navbar = (props) => {
  const menuRef = useRef(null); // Reference for the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check login status from localStorage
  // eslint-disable-next-line
  const [loginStatus, setLoginStatus] = useState(
    !!localStorage.getItem("authToken")
  );

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="header-block"
        style={{ backgroundColor: `${props.backGroundColor}` }}
      >
        <div className="header-links" ref={menuRef}>
          <p className="Name">
            <Link to="/Trip-connect" className="no-outline-navbar">
              TripConnect
            </Link>
          </p>
          <div className={`menu-links ${isMenuOpen ? "open" : ""}`}>
            <div className="menu-link-section">
              <p className="Register main-links-style" onClick={closeMenu}>
                <Link to="/Trip-connect/register" className="no-outline-navbar">
                  Register
                </Link>
              </p>
              <p className="Trips main-links-style" onClick={closeMenu}>
                <Link to="/Trip-connect/trips" className="no-outline-navbar">
                  Trips
                </Link>
              </p>
              <p className="Groups main-links-style" onClick={closeMenu}>
                <Link to="/Trip-connect/groups" className="no-outline-navbar">
                  Groups
                </Link>
              </p>
              <p className="Social main-links-style" onClick={closeMenu}>
                <Link to="/Trip-connect/connect" className="no-outline-navbar">
                  Connect
                </Link>
              </p>
              <p className="Social main-links-style" onClick={closeMenu}>
                <Link to="/Trip-connect/Reviews" className="no-outline-navbar">
                  Reviews
                </Link>
              </p>
            </div>

            {loginStatus ? (
              <Profile />
            ) : (
              <Link to="/Trip-connect/signIn">
                <button className="Join-now-button" onClick={closeMenu}>
                  SignIn/SignUp
                </button>
              </Link>
            )}
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
