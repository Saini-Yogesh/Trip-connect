import React from "react";
import "./AboutGroupCSS.css";

const AboutGroup2 = (props) => {
  const { feature, heading, description, buttonText } = props;
  return (
    <>
      <div className="Packageas-container Packageas-Group-container">
        <div className="Packageas-container-text">
          <div></div>
          <p className="Packageas-container-text1 Packageas-Group-container-text1">
            {feature}
          </p>
          <p className="Packageas-container-text2">
            <b> {heading} </b>
          </p>
        </div>
        <div className="Packageas-container-button">
          <p className="Packageas-container-button-text1 Packageas-Group-container-button-text1">
            {description}
          </p>
          <button className="Packageas-container-Book-Now-button Packageas-Group-container-button">
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutGroup2;
