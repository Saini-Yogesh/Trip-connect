import React from "react";
import RegisterContent from "../registerContent/RegisterContent";

const ReviewsRatingUsers = () => {
  const heading =
    "Discover Global Travel Insights and Stories Shared Worldwide.";
  const para =
    "Over 10,000 reviews from travelers worldwide, providing diverse and authentic travel insights. ";
  const btn1 = "Join Us ";
  const btn2 = "Explore Trips ";
  const num1 = "10k+";
  const num2 = "50k+";
  const num3 = "100k+";
  const txt1 = "Total Reviews";
  const txt2 = "Unique Destinations ";
  const txt3 = "Active Users ";
  const Link1 = "/Trip-connect/register";
  const Link2 = "/Trip-connect/trips";

  return (
    <div>
      <RegisterContent
        heading={heading}
        para={para}
        btn1={btn1}
        btn2={btn2}
        txt1={txt1}
        txt2={txt2}
        txt3={txt3}
        num1={num1}
        num2={num2}
        num3={num3}
        Link1={Link1}
        Link2={Link2}
      />
    </div>
  );
};

export default ReviewsRatingUsers;
