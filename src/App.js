import "./App.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useScrollToTop from "./components/useScrollToTop";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Trips from "./components/Trips";
import Connect from "./components/Connect";
import Groups from "./components/Groups";
import SignIn from "./components/SignInSignUp/SignIn";
import SignUp from "./components/SignInSignUp/SignUp";
import ContactInfo from "./components/peoplesInfo/PeopleInfo";
import ReviewSection from "./components/ReviewSection";
import FooterNavbar from "./components/FooterNavbar/FooterNavbar";
import Profile from "./components/profile/Profile";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import NotFound from "./components/notFound/NotFound";
import ProfileEdit from "./components/ProfileEdit/profileEdit";

const AppContent = () => {
  useScrollToTop();
  const location = useLocation();
  const getBackgroundColor = (path) => {
    return path === "/Trip-connect/" || path === "/Trip-connect"
      ? ""
      : "#1c2534";
  };
  return (
    <>
      <Navbar backGroundColor={getBackgroundColor(location.pathname)} />
      <Routes>
        <Route exact path="/Trip-connect" element={<Home />} />
        <Route exact path="/Trip-connect/register" element={<Register />} />
        <Route exact path="/Trip-connect/trips" element={<Trips />} />
        <Route exact path="/Trip-connect/groups" element={<Groups />} />
        <Route exact path="/Trip-connect/connect" element={<Connect />} />
        <Route exact path="/Trip-connect/reviews" element={<ReviewSection />} />
        <Route exact path="/Trip-connect/signIn" element={<SignIn />} />
        <Route exact path="/Trip-connect/signup" element={<SignUp />} />
        <Route
          exact
          path="/Trip-connect/groups/peopleInfo"
          element={<ContactInfo />}
        />
        <Route
          exact
          path="/Trip-connect/trips/peopleInfo"
          element={<ContactInfo />}
        />
        <Route
          exact
          path="/Trip-connect/profile/edit/:username"
          element={<ProfileEdit />}
        />
        <Route path="/Trip-connect/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all 404 route */}
      </Routes>
      <FooterNavbar />
      <ScrollToTopButton />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
