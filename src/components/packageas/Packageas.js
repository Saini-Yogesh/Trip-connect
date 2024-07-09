import React from "react";
import "./PackageasCSS.css";
import AboutGroup1 from "./AboutGroup1";
import AboutGroup2 from "./AboutGroup2";
import { useLocation, useNavigate } from "react-router-dom";

const Packageas = () => {
  const featuresDetal = [
    {
      feature: "User Profiles",
      heading: "Personalized Traveler Profiles",
      description:
        "Create your profile to connect, share, and plan trips with fellow travelers.",
      buttonText: "Sign Up",
      buttonLink: "",
    },
    {
      feature: "Search & Filter Trips",
      heading: "Find Your Perfect Trip",
      description:
        "Easily search and filter trips by destination, dates, budget, and more.",
      buttonText: "Search Now",
      buttonLink: "",
    },
    {
      feature: "Travel Blogs & Photos",
      heading: "Share Your Journeys",
      description:
        "Write blogs, post photos, and read reviews to enrich your travel experience.",
      buttonText: "Explore blog",
      buttonLink: "",
    },
  ];

  return (
    <>
      <div className="Packageas">
        <div className="Packageas-text">
          <b>Enrich Your Travel Experience Today</b>
        </div>
        {featuresDetal.map((group, index) =>
          index % 2 === 0 ? (
            <AboutGroup1
              key={index}
              feature={group.feature}
              heading={group.heading}
              description={group.description}
              buttonText={group.buttonText}
              buttonLink={group.buttonLink}
            />
          ) : (
            <AboutGroup2
              key={index}
              feature={group.feature}
              heading={group.heading}
              description={group.description}
              buttonText={group.buttonText}
              buttonLink={group.buttonLink}
            />
          )
        )}
        <div
          style={{
            width: "100%",
            bordeBottom: "solid rgb(69, 67, 67) 0.2vmin",
            marginBottom: "10vmin",
          }}
        ></div>
      </div>
    </>
  );
};

export default Packageas;
