import React from "react";
import "./AboutTripsDescribePart1CSS.css";
import TripsDescribe from "./TripsDescribe";

const AboutTripsDescribePart1 = (props) => {
  const {
    heading,
    description,
    button1Text,
    button2Text,
    button1Link,
    button2Link,
    imageLink,
  } = props;
  return (
    <>
      <div className="TripsDescribePart">
        <TripsDescribe
          heading={heading}
          description={description}
          button1Text={button1Text}
          button1Link={button1Link}
          button2Text={button2Text}
          button2Link={button2Link}
        />
        {/* eslint-disable-next-line */}
        <img src={imageLink} />
      </div>
    </>
  );
};

export default AboutTripsDescribePart1;
