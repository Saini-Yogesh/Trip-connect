import React from "react";
import Herosection from "./Herosection";
import Discoverbenifites from "./Discoverbenifites";
import ReviewsRatingUsers from "./ReviewsRatingUsers";
import OurPassionateTravel from "./OurPassionateTravel";
import AllReview from "./AllReview";
import FooterNavbar from "../FooterNavbar/FooterNavbar";
import SubmitReviesw from "./SubmitReviesw";

const ReviewSection = () => {
  return (
    <>
      <Herosection />
      <Discoverbenifites />
      <ReviewsRatingUsers />
      <OurPassionateTravel />
      <AllReview />
      <SubmitReviesw />
      <FooterNavbar />
    </>
  );
};

export default ReviewSection;
