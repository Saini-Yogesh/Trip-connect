import React from "react";
import "./Profile.css";

const SecondColume = (props) => {
  const { hobbiesOrProfession, about, history, experiences } = props;
  return (
    <div className="second-column">
      <div className="about">
        <h3 className="text-left-border">About</h3>
        <p>{about}</p>
      </div>
      <div className="hobbies">
        <h3 className="text-left-border">Hobbies/Profession</h3>
        <p>{hobbiesOrProfession}</p>
      </div>
      <div className="experience-section">
        <h3 className="text-left-border">Your Experience</h3>
        <p>{experiences}</p>
      </div>
      <div className="history-section">
        <h3 className="text-left-border">Your History</h3>
        <p>{history}</p>
      </div>
    </div>
  );
};

export default SecondColume;
