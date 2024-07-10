import React from "react";
import "./NavbarCSS.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <div>
        <div
          className="header-block"
          style={{ backgroundColor: `${props.backGroundColor}` }}
        >
          <div className="header-links">
            <p className="Name">
              <Link to="/" className="no-outline-navbar">
                TripConnect
              </Link>
            </p>
            <p className="Register main-links-style">
              <Link to="/register" className="no-outline-navbar">
                Register
              </Link>
            </p>
            <p className="Trips main-links-style">
              <Link to="/trips" className="no-outline-navbar">
                Trips
              </Link>
            </p>
            <p className="Groups main-links-style">
              <Link to="/groups" className="no-outline-navbar">
                Groups
              </Link>
            </p>
            <p className="Social main-links-style">
              <Link to="/connect" className="no-outline-navbar">
                Connect
              </Link>
            </p>
            <Link to="/signIn">
              <button className="Join-now-button">SignIn/SignUp</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
