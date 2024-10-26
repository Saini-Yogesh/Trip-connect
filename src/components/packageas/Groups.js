import React from "react";
import "./PackageasCSS.css";
import AboutGroup1 from "./AboutGroup1";
import AboutGroup2 from "./AboutGroup2";

const Groups = () => {
  const groupsDetails = [
    {
      heading: "Labuan Bajo Tour",
      description:
        "The Labuan Bajo Open Trip offers a unique adventure through the pristine islands of Komodo National Park, featuring stunning beaches, clear blue waters, and the famous Komodo dragons.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
    {
      heading: "Bali Beach Getaway",
      description:
        "Experience the best of Bali with this trip, including visits to iconic temples, vibrant markets, and beautiful beaches. Enjoy a mix of culture, relaxation, and adventure.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
    {
      heading: "Yogyakarta Cultural Tour",
      description:
        "Discover the rich history and culture of Yogyakarta with visits to the ancient temples of Borobudur and Prambanan, the Sultan's Palace, and local markets.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
    {
      heading: "Lombok Island Adventure",
      description:
        "Explore the natural beauty of Lombok with its stunning beaches, waterfalls, and the iconic Mount Rinjani. Perfect for nature lovers and adventure seekers.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
    {
      heading: "Jakarta City Excursion",
      description:
        "Dive into the bustling city life of Jakarta with visits to historical landmarks, vibrant shopping districts, and a taste of local cuisine. A perfect blend of modern and traditional experiences.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
    {
      heading: "Bandung Scenic Retreat",
      description:
        "Escape to the cool highlands of Bandung, known for its scenic landscapes, tea plantations, and colonial architecture. Ideal for a relaxing and refreshing getaway.",
      buttonText: "Find partner",
      buttonLink: "/Trip-connect/groups/PeopleInfo",
    },
  ];

  return (
    <>
      <div className="Packageas">
        <div className="Packageas-text">
          <b>Upcoming Tour 2024</b>
        </div>
        {groupsDetails.map((group, index) =>
          index % 2 === 0 ? (
            <AboutGroup1
              key={index}
              feature=""
              heading={group.heading}
              description={group.description}
              buttonText={group.buttonText}
              buttonLink={group.buttonLink}
            />
          ) : (
            <AboutGroup2
              key={index}
              feature=""
              heading={group.heading}
              description={group.description}
              buttonText={group.buttonText}
              buttonLink={group.buttonLink}
            />
          )
        )}
        <div
          style={{
            borderBottom: "solid rgb(69, 67, 67) 0.2vmin",
            width: "100%",
            margin: "5vmin 0px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Groups;
