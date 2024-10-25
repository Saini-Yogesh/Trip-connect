import React from "react";
import "./SignInSignUpCSS.css";

const loginIcons = () => {
  return (
    <>
      <div className="social-icons">
        <a href="/Trip-connect" className="icons">
          <i className="fa-brands fa-google"></i>
        </a>
        <a href="/Trip-connect" className="icons">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="/Trip-connect" className="icons">
          <i className="fa-brands fa-square-x-twitter"></i>
        </a>
      </div>
    </>
  );
};

export default loginIcons;
