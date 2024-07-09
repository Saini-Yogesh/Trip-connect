import React from "react";
import "./PeopleInfoCSS.css";
import PersonRow from "./PersonRow";

const PeopleInfo = () => {
  const people = [];

  // Fill the people array to have 30 entries
  while (people.length < 30) {
    const index = people.length + 1;
    people.push({
      name: `Person ${index}`,
      email: `person${index}@example.com`,
    });
  }

  return (
    <>
      <div style={{ margin: "15vmin" }}></div>
      <div className="List">
        <header className="People-List">
          <h1>Travellers List</h1>
        </header>
        <div className="rows">
          {people.map((person, index) => (
            <PersonRow key={index} name={person.name} email={person.email} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PeopleInfo;
