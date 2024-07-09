import React from "react";
import HighlightedFeaturesText from "./HighlightedFeaturesText";
import "./GalleryCSS.css";
import ExperienceAndSecurity from "./ExperienceAndSecurity";
import WhatOurTravelersSayText from "./WhatOurTravelersSayText";
import Review from "./Review";

const Gallery = () => {
  return (
    <>
      <div className="gallery">
        <HighlightedFeaturesText />
        <ExperienceAndSecurity />
        <WhatOurTravelersSayText />
        <Review />
      </div>
    </>
  );
};

export default Gallery;
