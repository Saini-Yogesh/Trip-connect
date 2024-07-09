import React from "react";
import Header from "./header/Header";
import AboutSection from "./about/AboutSection";
import FooterNavbar from "./FooterNavbar/FooterNavbar";
import Gallery from "./galleryAndReview/Gallery";
import Packageas from "./packageas/Packageas";

const Home = () => {
  return (
    <>
      <Header />
      <AboutSection />
      <Packageas />
      <Gallery />
      <FooterNavbar />
    </>
  );
};

export default Home;
