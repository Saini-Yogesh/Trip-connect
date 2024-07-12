import React from "react";
import "./HeroSectionCSS.css";
import mainImage from "./images/hero_section_image.jpg";

const Herosection = () => {
  return (
    <>
      <div className="review-section-hero-section">
        <div className="review-section-hero-left">
          <img src={mainImage} alt="/" className="review-section-main-image" />
        </div>
        <div className="review-section-hero-right">
          <h1 className="review-section-hero-title">
            Discover <br /> Adventures, Share
            <br /> Your Stories
          </h1>
          <div className="review-section-hero-icons">
            <div className="review-section-icon-text">
              <i className="fa-regular fa-lightbulb"></i>
              <p>
                Journey Through <br /> Other's Eyes
              </p>
            </div>
            <div className="review-section-icon-text">
              <i className="fa-solid fa-rocket"></i>
              <p>
                Capture Your Unique <br />
                Experience
              </p>
            </div>
            <div className="review-section-icon-text">
              <i className="fa-solid fa-circle-check"></i>
              <p>
                Connect With Fellow <br />
                Travelers
              </p>
            </div>
          </div>
          <div className="review-section-hero-buttons">
            <button className="review-section-button review-section-primary-button">
              Share Your Review
            </button>
            <button className="review-section-button review-section-secondary-button">
              Read Now <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Herosection;
