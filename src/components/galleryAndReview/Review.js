import React from "react";
import "./ReviewCSS.css";
import image1 from "./GalleryImages/review-img1.jpg";
import image2 from "./GalleryImages/review-img2.jpg";
import image3 from "./GalleryImages/review-img3.jpg";

const Review = () => {
  return (
    <>
      <div className="gallery-container5">
        <div className="review">
          <i className="fa-solid fa-quote-left"></i>
          <p className="review-text">
            TripConnect brought me amazing travel buddies!
          </p>
          <div className="review-img-box">
            {/* eslint-disable-next-line */}
            <img src={image1} />
            <p>Alex</p>
          </div>
        </div>
        <div className="review">
          <i className="fa-solid fa-quote-left"></i>
          <p className="review-text">Found my perfect travel group!</p>
          <div className="review-img-box">
            {/* eslint-disable-next-line */}
            <img src={image2} />
            <p>Jordan</p>
          </div>
        </div>
        <div className="review">
          <i className="fa-solid fa-quote-left"></i>
          <p className="review-text">Planning trips has never been easier.</p>
          <div className="review-img-box">
            {/* eslint-disable-next-line */}
            <img src={image3} />
            <p>Taylor</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
