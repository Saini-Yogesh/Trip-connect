import React from "react";
import "./AboutSectionPart1CSS.css";

const AboutSectionPart1 = (props) => {
  const { heading, smallHeadingtext } = props;
  return (
    <>
      <div className="container1">
        <p className="container1-text1">
          <b>{heading}</b>
        </p>
        <p className="container1-text2">
          <b>{smallHeadingtext}</b>
        </p>
      </div>
    </>
  );
};

export default AboutSectionPart1;
