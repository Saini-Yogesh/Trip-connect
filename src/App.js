import "./App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Trips from "./components/Trips";
import Connect from "./components/Connect";
import Groups from "./components/Groups";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const getBackgroundColor = (path) => {
    return path === "/" || path === "/Trip-connect" ? "" : "#002e33";
  };
  return (
    <>
      <Navbar backGroundColor={getBackgroundColor(location.pathname)} />
      <Routes>
        <Route exact path="/Trip-connect" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/trips" element={<Trips />} />
        <Route exact path="/connect" element={<Connect />} />
        <Route exact path="/groups" element={<Groups />} />
      </Routes>
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
