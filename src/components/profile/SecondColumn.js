import React from "react";
import "./Profile.css";

const SecondColume = () => {
  return (
    <div className="second-column">
      <div className="about">
        <h3 className="text-left-border">About</h3>
        <p>Brief description about yourself.</p>
      </div>
      <div className="hobbies">
        <h3 className="text-left-border">Hobbies/Profession</h3>
        <p>List your hobbies here.</p>
      </div>
      <div className="experience-section">
        <h3 className="text-left-border">Your Experience</h3>
        <p>Describe your experience here.</p>
      </div>
      <div className="history-section">
        <h3 className="text-left-border">Your History</h3>
        <p>Describe your history here.</p>
      </div>
    </div>
  );
};

export default SecondColume;
