import React from "react";
import "./HeaderCSS.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-section">
        <div className="header-container">
          <div className="flex-horizental">
            <p className="text1">
              <b>Discover Trips, Connect, Travel</b>
            </p>
            <p className="text2">
              Plan trips and connect with travelers easily.
            </p>
            <button
              className="get-started-button"
              onClick={() => {
                navigate("/Trip-connect/register");
              }}
            >
              Get Started!
            </button>
          </div>
          <div className="Social-icon">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-square-youtube"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
