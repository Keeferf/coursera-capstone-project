// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Highlights from "../components/Highlights";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import heroImage from "../assets/restauranfood.jpg";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate("/reservations");
  };

  return (
    <div className="homepage">
      {/* Hero with description and button */}
      <HeroSection
        title="Little Lemon"
        subtitle="Chicago"
        description="We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Our menu features locally-sourced ingredients and daily specials crafted by our expert chefs."
        buttonText="Reserve a Table"
        onButtonClick={handleReserveClick}
        showImage={true}
        imageSrc={heroImage}
        imageAlt="Little Lemon restaurant dish"
      />

      {/* Constrained width sections */}
      <div className="content-wrapper">
        <Highlights />
        <Testimonials />
        <About />
      </div>
    </div>
  );
};

export default HomePage;
