import React from "react";
import Header from "./header/Header";
import AboutSection from "./about/AboutSection";
import Gallery from "./galleryAndReview/Gallery";
import Packageas from "./packageas/Packageas";

const Home = () => {
  return (
    <>
      <Header />
      <AboutSection />
      <Packageas />
      <Gallery />
    </>
  );
};

export default Home;
