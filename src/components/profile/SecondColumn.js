import React, { useState } from "react";
import "./Profile.css";

const TruncatedText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = text.split("\n"); // Split the text into lines

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {(isExpanded ? lines : lines.slice(0, 8)).map((line, index) => (
          <div key={index}>{line}</div> // Use <div> to avoid nesting <p>
        ))}
      </div>

      {lines.length > 8 && (
        <button
          onClick={toggleExpanded}
          className="toggle-button"
          style={{
            color: "blue",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
            outline: "inherit",
          }}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

const SecondColume = (props) => {
  const { hobbiesOrProfession, about, history, experiences } = props;
  return (
    <div className="second-column">
      <div className="about">
        <h3 className="text-left-border">About</h3>
        <TruncatedText
          text={about || "Add your bio to find a better travel partner."}
        />
      </div>
      <div className="hobbies">
        <h3 className="text-left-border">Hobbies/Profession</h3>
        <TruncatedText
          text={
            hobbiesOrProfession ||
            "Add your hobbies or profession to find a better travel partner."
          }
        />
      </div>
      <div className="experience-section">
        <h3 className="text-left-border">Your Experience</h3>
        <TruncatedText
          text={
            experiences ||
            "Describe your experiences to find a better travel partner."
          }
        />
      </div>
      <div className="history-section">
        <h3 className="text-left-border">Your History</h3>
        <TruncatedText text={history} />
      </div>
    </div>
  );
};

export default SecondColume;
