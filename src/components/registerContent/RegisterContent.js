import React from "react";
import "./RegisterContentCSS.css";
import image1 from "./LoginPage-img.jpg";
import image2 from "./LoginPage-img2.jpg";

const RegisterContent = () => {
  return (
    <>
      <div className="registerMain">
        <div className="registerMain-container">
          <div className="registerMain-container-text-part">
            <p className="registerMain-container-text1">
              Plan Your Perfect Travel Adventure!
            </p>
            <p className="registerMain-container-text2">
              Discover like-minded travelers and create unforgettable journeys
              together. Sign up in minutes and connect with fellow adventurers
              today.
            </p>
            <div className="registerMain-container-buttons">
              <button className="registerMain-container-button1">
                <a href="/Trip-connect/signup" className="no-outline-main1">
                  Sign Up
                </a>
              </button>
              <button className="registerMain-container-button2">
                <a href="/Trip-connect/signIn" className="no-outline-main2">
                  Sign In
                </a>
              </button>
            </div>
            <div className="review-rating">
              <div className="users">
                <p>10k+</p>
                <p className="userstext">Users</p>
              </div>
              <div className="Countries">
                <p>50+</p>
                <p className="Countriestext">Countries</p>
              </div>
              <div className="Rating">
                <p>4.9</p>
                <p className="Ratingtext">Rating</p>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line */}
          <img src={image1} className="image1" />
          {/* eslint-disable-next-line */}
          <img src={image2} className="image2" />
        </div>
      </div>
    </>
  );
};

export default RegisterContent;
