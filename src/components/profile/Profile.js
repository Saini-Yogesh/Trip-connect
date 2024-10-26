import React from "react";
import Header from "./Header";
import ProfileDetails from "./FirstColumn";
import "./Profile.css";
import SecondColume from "./SecondColumn";

const Profile = () => {
  return (
    <>
      <div style={{ height: "15vmin" }}></div>
      <Header />
      <div className="profile-page">
        <div className="first-column">
          <ProfileDetails />
        </div>
        <div className="second-column">
          <SecondColume />
        </div>
      </div>
    </>
  );
};

export default Profile;
