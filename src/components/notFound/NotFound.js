// NotFound.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./NotFoundCSS.css";
import image from "./image404.png";

const NotFound = () => {
  const location = useLocation();
  const truncatedPath =
    location.pathname.length > 20
      ? location.pathname.slice(0, 20) + "..."
      : location.pathname;

  return (
    <>
      <div style={{ height: "15vmin" }}></div>
      <div className="not-found">
        <img src={image} alt="Not Found" className="not-found-image" />
        <h1>404 - Page Not Found</h1>
        <p>
          The page <code>{truncatedPath}</code> does not exist.
        </p>
        <a href="/Trip-connect" className="back-home">
          Go Back Home
        </a>
      </div>
    </>
  );
};

export default NotFound;
