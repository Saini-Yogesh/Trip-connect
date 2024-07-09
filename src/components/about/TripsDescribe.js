import React from "react";
import { useNavigate } from "react-router-dom";
import "./TripsDescribeCSS.css";

const TripsDescribe = (props) => {
  let navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/people-info");
  };

  const {
    heading,
    description,
    button1Text,
    button2Text,
    button1Link,
    button2Link,
  } = props;

  return (
    <div className="TripsDescribePart-text">
      <p className="TripsDescribePart-text1">
        <b>{heading}</b>
      </p>
      <p className="TripsDescribePart-text2">
        <b>{description}</b>
      </p>
      <div className="TripsDescribePart-buttons">
        <button className="TripsDescribePart-button1" onClick={handleOnClick}>
          {button1Text}
        </button>
        <button className="TripsDescribePart-button2" onClick={handleOnClick}>
          {button2Text}
        </button>
      </div>
    </div>
  );
};

export default TripsDescribe;
