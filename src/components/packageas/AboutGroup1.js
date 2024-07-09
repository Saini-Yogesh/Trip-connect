import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AboutGroupCSS.css";

const AboutGroup1 = (props) => {
  let navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/people-info");
  };
  const { feature, heading, description, buttonText, buttonLink } = props;
  return (
    <>
      <div className="Packageas-container">
        <div className="Packageas-container-text">
          <div></div>
          <p className="Packageas-container-text1">{feature}</p>
          <p className="Packageas-container-text2">
            <b> {heading}</b>
          </p>
        </div>
        <div className="Packageas-container-button">
          <p className="Packageas-container-button-text1">{description}</p>
          <button
            className="Packageas-container-Book-Now-button"
            onClick={handleOnClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutGroup1;
