import React from "react";
import "./AboutGroupCSS.css";
import { useNavigate } from "react-router-dom";

const AboutGroup1 = (props) => {
  const navigate = useNavigate();
  const { heading, description, buttonText, buttonLink } = props;

  const handleOnclick = () => {
    const dataToSend = { TourName: heading, category: "groups" };
    navigate(buttonLink, { state: dataToSend });
  };

  return (
    <>
      <div className="Packageas-container">
        <div className="Packageas-container-text">
          <div></div>
          <p className="Packageas-container-text2">
            <b> {heading}</b>
          </p>
        </div>
        <div className="Packageas-container-button">
          <p className="Packageas-container-button-text1">{description}</p>
          <button
            className="Packageas-container-Book-Now-button"
            onClick={handleOnclick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutGroup1;
