import React from "react";
import "./DiscoverbenifitesCSS.css";

const Discoverbenifites = () => {
  const infos = [
    {
      id: 1,
      icon: "fas fa-plane", // Example icon class from FontAwesome
      heading: "Travel Planning",
      intro: "Plan your trips with ease and convenience.",
    },
    {
      id: 2,
      icon: "fas fa-camera",
      heading: "Photography Tips",
      intro: "Capture the best moments of your journey.",
    },
    {
      id: 3,
      icon: "fas fa-map-marked-alt",
      heading: "Destination Guides",
      intro: "Explore detailed guides for your next destination.",
    },
    {
      id: 4,
      icon: "fas fa-hiking",
      heading: "Adventure Activities",
      intro: "Find the best activities for thrill seekers.",
    },
  ];
  return (
    <>
      <div className="main-info-section">
        <p className="Discover-Benefits-Text">Discover Benefits</p>
        <div className="info-section">
          {infos.map((info) => (
            <div className="info-box" key={info.id}>
              <i className={`info-icon ${info.icon}`}></i>
              <h3 className="info-heading">{info.heading}</h3>
              <p className="info-intro">{info.intro}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discoverbenifites;
