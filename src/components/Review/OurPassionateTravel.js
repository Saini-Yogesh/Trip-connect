import React from "react";
import "./OurPassionateTravelCSS.css";
import person1 from "./images/1.jpg";
import person2 from "./images/2.jpg";
import person3 from "./images/3.jpg";
import person4 from "./images/4.jpg";

const OurPassionateTravel = () => {
  const travelers = [
    {
      id: 1,
      name: "John Doe",
      position: "Travel Expert",
      image: person1,
      instaLink: "https://www.instagram.com/johndoe",
      faceBookLink: "https://www.facebook.com/johndoe",
      youtubeLink: "https://www.youtube.com/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Photographer",
      image: person2,
      instaLink: "https://www.instagram.com/janesmith",
      faceBookLink: "https://www.facebook.com/janesmith",
      youtubeLink: "https://www.youtube.com/janesmith",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "Blogger",
      image: person3,
      instaLink: "https://www.instagram.com/alicejohnson",
      faceBookLink: "https://www.facebook.com/alicejohnson",
      youtubeLink: "https://www.youtube.com/alicejohnson",
    },
    {
      id: 4,
      name: "Bob Brown",
      position: "Adventurer",
      image: person4,
      instaLink: "https://www.instagram.com/bobbrown",
      faceBookLink: "https://www.facebook.com/bobbrown",
      youtubeLink: "https://www.youtube.com/bobbrown",
    },
  ];

  return (
    <div className="our-passionate-travel">
      <p className="passionate-travel">
        Meet Our Passionate
        <br /> Travel Community
        <br /> Members Who Share
        <br /> Unique Insights
        <br /> ❣️
      </p>
      <div className="travelers">
        {travelers.map((traveler) => (
          <div className="traveler" key={traveler.id}>
            <div className="image-container">
              <img src={traveler.image} alt={traveler.name} />
              <div className="overlay">
                <div className="social-icons">
                  <a
                    href={traveler.instaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram icon"></i>
                  </a>
                  <a
                    href={traveler.faceBookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook icon"></i>
                  </a>
                  <a
                    href={traveler.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-youtube icon"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="info">
              <h2>{traveler.name}</h2>
              <p>{traveler.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPassionateTravel;
