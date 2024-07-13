import React from "react";
import "./RegisterContentCSS.css";
import image1 from "./LoginPage-img.jpg";
import image2 from "./LoginPage-img2.jpg";
import { useNavigate } from "react-router-dom";

const RegisterContent = (props) => {
  const {
    heading,
    para,
    btn1,
    btn2,
    num1,
    num2,
    num3,
    txt1,
    txt2,
    txt3,
    Link1,
    Link2,
  } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="registerMain">
        <div className="registerMain-container">
          <div className="registerMain-container-text-part">
            <p className="registerMain-container-text1">{heading}</p>
            <p className="registerMain-container-text2">{para}</p>
            <div className="registerMain-container-buttons">
              <button
                className="registerMain-container-button1"
                onClick={() => {
                  navigate(Link1);
                }}
              >
                {btn1}
              </button>
              <button
                className="registerMain-container-button2"
                onClick={() => {
                  navigate(Link2);
                }}
              >
                {btn2} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="review-rating">
              <div className="users">
                <p>{num1}</p>
                <p className="userstext">{txt1}</p>
              </div>
              <div className="Countries">
                <p>{num2}</p>
                <p className="Countriestext">{txt2}</p>
              </div>
              <div className="Rating">
                <p>{num3}</p>
                <p className="Ratingtext">{txt3}</p>
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
