import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import formatRelativeTime from "./formRelativeTime";

const TruncatedText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = text.split("\n"); // Split the text into lines

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {(isExpanded ? lines : lines.slice(0, 4)).map((line, index) => (
          <div key={index}>{line}</div> // Use <div> to avoid nesting <p>
        ))}
      </div>

      {lines.length > 4 && (
        <button onClick={toggleExpanded} className="toggle-button">
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

const SecondColumn = (props) => {
  const { hobbiesOrProfession, about, history, experiences, username } = props;
  const navigate = useNavigate();

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
        <h3 className="text-left-border">
          Your History{" "}
          <span
            onClick={() =>
              navigate(`/Trip-connect/profile/${username}/all-history`, {
                state: { history },
              })
            }
            style={{ cursor: "pointer", color: "blue" }}
          >
            View all History
          </span>
        </h3>
        {history && history.length > 0 ? (
          history
            .slice(-6)
            .reverse()
            .map((entry, index) => (
              <div
                key={index}
                className={`history-entry ${
                  index % 2 === 0 ? "history-entry-background" : ""
                }`}
              >
                <p>
                  Planned an adventure to <strong>{entry.description}</strong>
                </p>
                <p>{formatRelativeTime(entry.date)}</p>
              </div>
            ))
        ) : (
          <p>
            Your history is currently empty. Start exploring to see your recent
            activity here!
          </p>
        )}
      </div>
    </div>
  );
};

export default SecondColumn;
