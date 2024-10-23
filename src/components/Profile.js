import React from "react";
import Header from "./profile/Header";
import ProfileDetails from "./profile/ProfileDetails";
import AboutSection from "./profile/AboutSection";
import ExperienceSection from "./profile/ExperienceSection";
import HistorySection from "./profile/HistorySection";
import HobbiesSection from "./profile/HobbiesSection";
import "../components/profile/Profile.css";

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
          <AboutSection />
          <HobbiesSection />
          <ExperienceSection />
          <HistorySection />
        </div>
      </div>
    </>
  );
};

export default Profile;
