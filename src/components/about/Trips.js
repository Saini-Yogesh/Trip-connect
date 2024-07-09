import React from "react";
import AboutSectionPart1 from "./AboutSectionPart1";
import AboutTripsDescribePart1 from "./AboutTripsDescribePart1";
import AboutTripsDescribePart2 from "./AboutTripsDescribePart2";
import "./AboutSectionCSS.css";
import image1 from "./images/trips-img1.jpg";
import image2 from "./images/trips-img2.jpg";
import image3 from "./images/trips-img3.jpg";
import image4 from "./images/trips-img4.jpg";

const Trips = () => {
  const tripDetails = [
    {
      heading: "Bali and Lembongan",
      description:
        "Amazing package for your and your friends to be satisfied on vacation in Bali- Lombok island. Then it is recommended that you book.",
      button1Text: "Book Now",
      button2Text: "Read More",
      button1Link: "",
      button2Link: "",
      imageLink: image1,
    },
    {
      heading: "Padar Island",
      description:
        "If you have never visited Padar island i suggest you go here , it will be a life time experience that Padar island. Then it is recommended that you book.",
      button1Text: "Book Now",
      button2Text: "Read More",
      button1Link: "",
      button2Link: "",
      imageLink: image2,
    },
    {
      heading: "Journey Sumba Island",
      description:
        "This 4 days 3 Nights Sumba Island Trip packages is ready to go every day. Starting from west Sumba to east Sumba. Then it is recommended that you book.",
      button1Text: "Book Now",
      button2Text: "Read More",
      button1Link: "",
      button2Link: "",
      imageLink: image3,
    },
    {
      heading: "Tour of manali",
      description:
        "Experience the beauty of Manali with our 4 days 3 nights package. Enjoy the scenic landscapes, adventure sports, and vibrant local culture. Highly recommended for nature and thrill enthusiasts.",
      button1Text: "Book Now",
      button2Text: "Read More",
      button1Link: "",
      button2Link: "",
      imageLink: image4,
    },
  ];
  return (
    <>
      <div className="about-section">
        <AboutSectionPart1 heading="About Trips" smallHeadingtext="" />
        {tripDetails.map((group, index) =>
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

export default Trips;
