import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesShowcase from "../components/ServicesShowcase";
import WhyChooseUs from "../components/WhyChooseUs";

import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServicesShowcase />
      <WhyChooseUs />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
