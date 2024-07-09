import React from "react";
import "./TripsDescribeCSS.css";

const TripsDescribe = (props) => {
  const { heading, description, button1Text, button2Text } = props;

  return (
    <div className="TripsDescribePart-text">
      <p className="TripsDescribePart-text1">
        <b>{heading}</b>
      </p>
      <p className="TripsDescribePart-text2">
        <b>{description}</b>
      </p>
      <div className="TripsDescribePart-buttons">
        <button className="TripsDescribePart-button1">{button1Text}</button>
        <button className="TripsDescribePart-button2">{button2Text}</button>
      </div>
    </div>
  );
};

export default TripsDescribe;
