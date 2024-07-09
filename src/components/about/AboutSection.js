import React from "react";
import AboutSectionPart1 from "./AboutSectionPart1";
import AboutTripsDescribePart1 from "./AboutTripsDescribePart1";
import AboutTripsDescribePart2 from "./AboutTripsDescribePart2";
import "./AboutSectionCSS.css";
import image1 from "./images/about-section-img1.jpg";
import image2 from "./images/about-section-img2.jpg";
import image3 from "./images/about-section-img3.jpg";

const AboutSection = () => {
  const AboutDetail = [
    {
      heading: "Effortless Trip Planning",
      description:
        "Create, organize, and customize your trips with ease using our intuitive interface.",
      button1Text: "Plan Now",
      button2Text: "Learn More",
      button1Link: "",
      button2Link: "",
      imageLink: image1,
    },
    {
      heading: "AI-Powered Matching",
      description:
        "Find compatible travel buddies with our advanced AI matching system.",
      button1Text: "Match Now",
      button2Text: "Discover More",
      button1Link: "",
      button2Link: "",
      imageLink: image2,
    },
    {
      heading: "Dynamic Group Formation",
      description:
        "Form travel groups based on shared interests and destinations easily.",
      button1Text: "Join Now",
      button2Text: "Discover More",
      button1Link: "",
      button2Link: "",
      imageLink: image3,
    },
  ];
  return (
    <>
      <div className="about-section">
        <AboutSectionPart1
          heading="Seamless Trip Planning and Social Connections"
          smallHeadingtext="Plan trips, connect with travelers, share experiences."
        />
        {AboutDetail.map((group, index) =>
          index % 2 === 0 ? (
            <AboutTripsDescribePart1
              key={index}
              heading={group.heading}
              description={group.description}
              button1Text={group.button1Text}
              button2Text={group.button2Text}
              button1Link={group.button1Link}
              button2Link={group.button2Link}
              imageLink={group.imageLink}
            />
          ) : (
            <AboutTripsDescribePart2
              key={index}
              heading={group.heading}
              description={group.description}
              button1Text={group.button1Text}
              button2Text={group.button2Text}
              button1Link={group.button1Link}
              button2Link={group.button2Link}
              imageLink={group.imageLink}
            />
          )
        )}
      </div>
    </>
  );
};

export default AboutSection;
