import React from "react";
import "./TripsDescribeCSS.css";
import { useNavigate } from "react-router-dom";

const TripsDescribe = (props) => {
  const navigate = useNavigate();
  const {
    heading,
    description,
    button1Text,
    button2Text,
    button1Link,
    button2Link,
  } = props;

  const handleOnclick = () => {
    const dataToSend = { TourName: heading, category: "trips" };
    navigate(button1Link, { state: dataToSend });
  };

  return (
    <div className="TripsDescribePart-text">
      <p className="TripsDescribePart-text1">
        <b>{heading}</b>
      </p>
      <p className="TripsDescribePart-text2">
        <b>{description}</b>
      </p>
      <div className="TripsDescribePart-buttons">
        <button className="TripsDescribePart-button1" onClick={handleOnclick}>
          {button1Text}
        </button>
        <button
          className="TripsDescribePart-button2"
          onClick={() => {
            navigate(button2Link);
          }}
        >
          {button2Text}
        </button>
      </div>
    </div>
  );
};

export default TripsDescribe;
